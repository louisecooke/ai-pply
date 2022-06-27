from django.db import models
from .system_models import Participant, System

class Variants(models.TextChoices):
    WELLBEING = 'WELL'
    EVALUATION = 'EVAL'

class Question(models.Model):
    text = models.CharField(max_length=400)

    variant = models.CharField(
        max_length=4,
        choices=Variants.choices,
        null=True
    )

    def __str__(self):
        return self.text


#bring in images as optional field here, use smileys instead of a separate table.
#text is therefore also optional
class Option(models.Model):
    text = models.CharField(max_length=200)
    value = models.IntegerField(null=True)
    variant = models.CharField(
        max_length=4,
        choices=Variants.choices,
        null=True
    )

    def __str__(self):
        return self.text

#system is NULL when the answer is for a wellbeing question
#complicated key relationship. one participant, one system, one option for a system question
#but one participant, one option for a wellbeing question.
class Answer(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.PROTECT, verbose_name="participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, blank=True, null=True, verbose_name="evaluated system")
    question = models.ForeignKey(Question, on_delete=models.PROTECT, verbose_name="question")
    option = models.ForeignKey(Option, on_delete=models.PROTECT, verbose_name="chosen option")
    #value = models.IntegerField()

    def __str__(self):
        return str(self.option)

# A user evaluation of a system can be composed by querying all the answers with the participant and system ID.
# The wellbeing of the user can be composed by querying all the answers with the participant ID and NULL system ID.

class Smiley(models.Model):
    value = models.IntegerField()
    image = models.ImageField(upload_to='')

    def __str__(self):
        return str(self.image)
