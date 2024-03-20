from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship

from .database import Base


class Submission(Base):
    __tablename__ = "submissions"

    userid = Column(String(128) , primary_key=True)
    essayid = Column(String(128), primary_key=True)


class Score(Base):
    __tablename__ = "scores"

    userid = Column(String(128), ForeignKey("submissions.userid", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    essayid = Column(String(128), ForeignKey("submissions.essayid", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    feedback = Column(String(5120), default=None)
    suggestion = Column(String(5120), default=None)
    score = Column(Integer, default=None)


class RubricScore(Base):
    __tablename__ = "rubric_scores"

    rubricid = Column(Integer, ForeignKey("rubrics.rubricid", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    userid = Column(String(128), ForeignKey("submissions.userid", ondelete="CASCADE", onupdate="CASCADE"))
    essayid = Column(String(128), ForeignKey("submissions.essayid", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    score = Column(Integer, default=None)
    feedback = Column(String(5120), default=None)


class Rubric(Base):
    __tablename__ = "rubrics"

    rubricid = Column(Integer, primary_key=True)
    score = Column(Integer, default=None)
    description = Column(String(5120), default=None)