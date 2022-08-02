from django.db import models
from PIL import Image
from django.contrib.postgres.fields import ArrayField

class System(models.Model):
    title = models.CharField(max_length=80)
    description = models.CharField(max_length=200, blank=True)
    transparency = models.BooleanField()
    control = models.BooleanField()
    image = models.ImageField(upload_to='')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("id", )


class Participant(models.Model):
    id = models.CharField(max_length=160, primary_key=True)
    timestamp = models.DateTimeField()
    interactions = models.ManyToManyField(System, through='Interaction', blank=True)

    def __str__(self):
        return self.id


class Characteristic(models.Model):
    title = models.CharField(max_length=80)

    def __str__(self):
        return self.title


class Interaction(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, verbose_name="related participant")
    system = models.ForeignKey(System, on_delete=models.PROTECT, verbose_name="related system")
    timestamp = models.DateTimeField()
    total_time = models.IntegerField(null=True)
    a_changes = models.IntegerField(null=True)
    c_changes = models.IntegerField(null=True)
    t_clicks = models.IntegerField(null=True)
    system_ranking = ArrayField(models.IntegerField(blank=False))
    user_ranking = ArrayField(models.IntegerField(blank=False))

    class Meta:
        unique_together = ('participant', 'system',)