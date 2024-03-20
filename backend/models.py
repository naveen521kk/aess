import mongoengine as db


class Response(db.Document):
    userid = db.StringField(required=True)
    essay = db.StringField(required=True)
    response = db.DictField()
    grammar = db.ListField()
    readability = db.DictField()
    stats = db.DictField()