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
