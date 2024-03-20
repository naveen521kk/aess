import re
import math


def smog_readability(text):
    words = re.findall(r"\b\w+\b", text)
    polysyllable_count = sum(
        1 for word in words if len(re.findall(r"[aeiouy]+", word)) > 2
    )

    n = len(words)
    smog = 1.0430 * math.sqrt(polysyllable_count * (30 / n)) + 3.1291

    return smog


def coleman_liau_readability(text):
    words = re.findall(r"\b\w+\b", text)
    sentences = re.split(r"[.!?]", text)
    char_count = sum(len(word) for word in words)

    l = char_count / len(words) * 100
    s = len(sentences) / len(words) * 100
    coleman_liau = 0.0588 * l - 0.296 * s - 15.8

    return coleman_liau


def flesch_kincaid_readability(text):
    words = re.findall(r"\b\w+\b", text)
    sentences = re.split(r"[.!?]", text)
    syllable_count = sum(len(re.findall(r"[aeiouAEIOU]+", word)) for word in words)

    fk = (
        0.39 * (len(words) / len(sentences))
        + 11.8 * (syllable_count / len(words))
        - 15.59
    )

    return fk


def gunning_fog_readability(text):
    words = re.findall(r"\b\w+\b", text)
    sentences = re.split(r"[.!?]", text)
    complex_word_count = sum(
        1 for word in words if len(re.findall(r"[aeiouy]+", word)) > 2
    )

    gf = 0.4 * ((len(words) / len(sentences)) + 100 * (complex_word_count / len(words)))

    return gf


def get_weighted_readability_level(smog_score, coleman_liau_score, fk_score, gf_score):
    weighted_score = (
        (smog_score * 0.2)
        + (coleman_liau_score * 0.2)
        + (fk_score * 0.3)
        + (gf_score * 0.3)
    )

    if weighted_score >= 14:
        return "Professional (Master's or Doctorate level)"
    elif weighted_score >= 12:
        return "Postgraduate (Masters) level"
    elif weighted_score >= 10:
        return "Undergraduate (Bachelor's) level"
    elif weighted_score >= 8:
        return "Higher Secondary (Grade 11-12) level"
    elif weighted_score >= 6:
        return "Secondary (Grade 9-10) level"
    elif weighted_score >= 4:
        return "Middle School (Grade 6-8) level"
    else:
        return "Primary School (Grade 1-5) level"


def get_readability_levels(essay):
    smog_score = smog_readability(essay)
    coleman_liau_score = coleman_liau_readability(essay)
    fk_score = flesch_kincaid_readability(essay)
    gf_score = gunning_fog_readability(essay)
    readability_level = get_weighted_readability_level(
        smog_score, coleman_liau_score, fk_score, gf_score
    )
    return {
        "smog_score": smog_score,
        "coleman_liau_score": coleman_liau_score,
        "flesch_kincaid_score": fk_score,
        "gunning_fog_score": gf_score,
        "readability_level": readability_level,
    }


