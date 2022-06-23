from django.db import models
from PIL import Image

class System(models.Model):
    title = models.CharField(max_length=80)
    transparency = models.BooleanField()
    control = models.BooleanField()
    image = models.ImageField(upload_to='')

    def __str__(self):
        return self.title


class Participant(models.Model):
    name = models.CharField(max_length=80)
    email = models.CharField(max_length=80)
    systems = models.ManyToManyField(System, through='Completion', blank=True)

    def __str__(self):
        return self.name


class Characteristic(models.Model):
    title = models.CharField(max_length=80)

    def __str__(self):
        return self.title


class Completion(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.PROTECT, verbose_name="related participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, verbose_name="related system")
    completedOn = models.DateField()
    time = models.IntegerField(null=True)

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
class Answer(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.PROTECT, verbose_name="participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, blank=True, null=True, verbose_name="evaluated system")
    option = models.ForeignKey(Option, on_delete=models.PROTECT, verbose_name="chosen option")

    def __str__(self):
        return str(self.option)

# A user evaluation of a system can be composed by querying all the answers with the participant and system ID.
# The wellbeing of the user can be composed by querying all the answers with the participant ID and NULL system ID.
