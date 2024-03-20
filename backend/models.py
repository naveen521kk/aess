import mongoengine as db

db.connect('essay_scores')

class Response(db.Document):
    userid = db.StringField(required=True)
    essay = db.StringField(required=True)
    response = db.DictField()
    grammar = db.ListField()