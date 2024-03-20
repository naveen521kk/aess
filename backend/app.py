import os
import docx2txt
import PyPDF2
import uvicorn
import json
import language_tool_python
import mongoengine as db
import google.generativeai as genai

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import Response
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(root_path=os.environ.get("ROOT_PATH"))
lang_tool = language_tool_python.LanguageTool("en-US")

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

db.connect(host=os.environ.get("MONGO_URI", "mongodb://127.0.0.1:27017/essay_scores"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EssayItem(BaseModel):
    text: str


@app.get("/home")
async def home():
    return {"message": "Hello World"}


@app.post("/parse_file")
async def parse_file(file: UploadFile):
    extension = file.filename.split(".")[-1]
    if extension == "docx":
        text = docx2txt.process(file.file)
    elif extension == "pdf":
        pdf_file = file.file
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        pages = len(pdf_reader.pages)
        text = ""
        for page_num in range(pages):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    elif extension == "txt":
        text_file = file.file
        text = text_file.read()
    else:
        text = f"Unsupported file format: {extension}"
    return text


@app.post("/gram_mech_check")
async def check_grammer_mechanics(userid: str, essay_item: EssayItem):
    response = Response.objects(userid=userid, essay=essay_item.text).first()
    if response is None:
        response = Response(userid=userid, essay=essay_item.text)
    if response.grammar:
        return (
            response.grammar,
            100 - len(response.grammar) / max(len(response.essay.split()), 1) * 100,
        )
    text = essay_item.text
    matches = lang_tool.check(text)
    errors = []
    for match in matches:
        error = {
            "message": match.message,
            "category": match.ruleId,
            "location": (match.offset, match.offset + match.errorLength),
            "suggestion": match.replacements[:5],
        }
        errors.append(error)
    word_count = max(len(text.split()), 1)
    score = 100 - len(errors) / word_count * 100
    response.grammar = errors
    response.save()
    return errors, score


@app.post("/get_llm_feedback")
def get_llm_feedback(userid: str, essay_item: EssayItem):
    response = Response.objects(userid=userid, essay=essay_item.text).first()
    if response is None:
        response = Response(userid=userid, essay=essay_item.text)
    if response.response:
        return response.response
    essay = essay_item.text
    prompt = "Grade the given essay using the given rubrics in the given json format. Also give personalised feedback and suggestions."
    rubrics = """
- Focus & Details
(4) There is one clear, well focused topic. Main ideas are clear and are well supported by detailed and accurate information.
(3) There is one clear, well focused topic. Main ideas are clear but are not well supported by detailed information.
(2) There is one topic. Main ideas are somewhat clear. 
(1) The topic and main ideas are not clear. 
- Organization
(4) The introduction is inviting, states the main topic, and provides an overview of the paper. Information is relevant and presented in a logical order. The conclusion is strong.
(3) The introduction states the main topic and provides an overview of the paper. A conclusion is included. 
(2) The introduction states the main topic. A conclusion is included.
(1) There is no clear introduction, structure, or conclusion. 
- Voice
(4) The author's purpose of writing is very clear, and there is strong evidence of attention to audience. The author’s extensive knowledge and/or experience with the topic is/are evident.
(3) The author's purpose of writing is somewhat clear, and there is some evidence of attention to audience. The author’s knowledge and/or experience with the topic is/are evident.
(2) The author's purpose of writing is somewhat clear, and there is evidence of attention to audience. The author’s knowledge and/or experience with the topic is/are limited.
(1) The author's purpose of writing is unclear. 
- Word Choice
(4) The author uses vivid words and phrases. The choice and placement of words seems accurate, natural, and not forced. 
(3) The author uses vivid words and phrases. The choice and placement of words is inaccurate at times and/or seems overdone.
(2) The author uses words that communicate clearly, but the writing lacks variety.
(1) The writer uses a limited vocabulary. Jargon or clichés may be present and detract from the meaning.
- Sentence Structure, Grammar, Mechanics, & Spelling
(4) All sentences are well constructed and have varied structure and length. The author makes no errors in grammar, mechanics, and/or spelling. 
(3) Most sentences are well constructed and have varied structure and length. The author makes a few errors in grammar, mechanics, and/or spelling, but they do not interfere with understanding.
(2) Most sentences are well constructed, but they have a similar structure and/or length. The author makes several errors in grammar, mechanics, and/or spelling that interfere  with understanding.
(1) Sentences sound awkward, are distractingly repetitive, or are difficult to understand. The author makes numerous errors in grammar, mechanics, and/or spelling that interfere with understanding.
"""
    json_format = """
{
	"rubrics": 
        [
            {
                "name": str,
                "grade": int,
                "feedback": str
            }
    ],
    "total": int,
    "feedback": str,
    "suggestions": [str]
}
"""
    text = (
        prompt
        + "\nRubricks:"
        + rubrics
        + "\nJson Format:\n```\n"
        + json_format
        + "```\nEssay:\n```"
        + essay
        + "\n```"
    )
    llm_response = model.generate_content(text)
    try:
        # response_text = llm_response.text.replace("\n", "").replace("\t", "").strip('"')
        response_text = llm_response.text
        start = response_text.find("{")
        end = response_text.rfind("}")
        response_text = response_text[start : end + 1]
        json_response = json.loads(response_text)
        json_response["total"] = sum(
            [rubrick["grade"] for rubrick in json_response["rubrics"]]
        )
        response.response = json_response
        response.save()
        return json_response
    except Exception as e:
        print(e)
        return llm_response.text


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
