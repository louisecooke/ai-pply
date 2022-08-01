from django.db import models
from PIL import Image

class System(models.Model):
    title = models.CharField(max_length=80)
    description = models.CharField(max_length=200, blank=True)
    transparency = models.BooleanField()
    control = models.BooleanField()
    image = models.ImageField(upload_to='')

    def __str__(self):
        return self.title


class Participant(models.Model):
    id = models.CharField(max_length=160, primary_key=True)
    creationTime = models.DateField()
    completions = models.ManyToManyField(System, through='Completion', blank=True)

    def __str__(self):
        return self.id


class Characteristic(models.Model):
    title = models.CharField(max_length=80)

    def __str__(self):
        return self.title


class Completion(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.PROTECT, verbose_name="related participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, verbose_name="related system")
    completedOn = models.DateField()
    time = models.IntegerField(null=True)
