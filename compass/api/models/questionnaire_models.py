from django.db import models
from .system_models import Participant, System

class Variants(models.TextChoices):
    WELLBEING = 'WELL'
    EVALUATION = 'EVAL'

class Scale(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Option(models.Model):
    class Meta:
        ordering = ("value", )

    text = models.CharField(max_length=200, null=True, blank=True)
    value = models.IntegerField()
    variant = models.CharField(
        max_length=4,
        choices=Variants.choices,
        null=True
    )
    image = models.ImageField(upload_to='', blank=True, null=True)
    scale = models.ForeignKey(Scale, on_delete=models.PROTECT, verbose_name="scale", null=True, blank=True, related_name="options")

    def __str__(self):
        if (self.text):
            return self.text
        elif (self.image):
            return self.image.name
        else:
            return value

class Question(models.Model):
    text = models.CharField(max_length=400)
    scale = models.ForeignKey(Scale, on_delete=models.PROTECT, verbose_name="scale", null=True, blank=True)
    variant = models.CharField(
        max_length=4,
        choices=Variants.choices,
        null=True
    )

    def __str__(self):
        return self.text


#system is NULL when the answer is for a wellbeing question
class Answer(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.PROTECT, verbose_name="participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, blank=True, null=True, verbose_name="evaluated system")
    question = models.ForeignKey(Question, on_delete=models.PROTECT, verbose_name="question")
    option = models.ForeignKey(Option, on_delete=models.PROTECT, verbose_name="chosen option")

    def __str__(self):
        return str(self.option)

# A user evaluation of a system can be composed by querying all the answers with the participant and system ID.
# The wellbeing of the user can be composed by querying all the answers with the participant ID and NULL system ID.

