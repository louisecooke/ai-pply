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

class Gender(models.TextChoices):
    MALE = 'MAL'
    FEMALE = 'FEM'
    OTHER = 'OTH'
    DEFAULT = 'DEF'

class Age(models.TextChoices):
    UNDER_18 = '00_18'
    _18_24 = '18_24'
    _25_34 = '25_34'
    _35_44 = '35_44'
    _45_54 = '45_54'
    _55 = '55_00'
    DEFAULT = 'DEF'

class Education(models.TextChoices):
    UNDER = 'UND'
    SECONDARY = 'SEC'
    FACHHOCHSCHULE = 'FHS'
    APPRENTICESHIP = 'APP'
    TRADE_TECHNICAL = 'TRA'
    BACHELOR = 'BAC'
    MASTER = 'MAS'
    PHD = 'PHD'
    DEFAULT = 'DEF'

class Participant(models.Model):
    id = models.CharField(max_length=160, primary_key=True)
    timestamp = models.DateTimeField()
    gender = models.CharField(max_length=5, choices=Gender.choices, null=True)
    age = models.CharField(max_length=5, choices=Age.choices, null=True)
    education = models.CharField(max_length=5, choices=Education.choices, null=True)
    interactions = models.ManyToManyField(System, through='Interaction', blank=True)

    def __str__(self):
        return self.id

#if systems are deleted, the interactions will not be deleted alongside. the system ID will be preserved, although it will not 
#reference an existing foreign key
class Interaction(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, verbose_name="related participant")
    system = models.ForeignKey(System, on_delete=models.DO_NOTHING, verbose_name="related system")
    timestamp = models.DateTimeField()
    total_time = models.IntegerField(null=True)
    a_changes = models.IntegerField(null=True)
    c_changes = models.IntegerField(null=True)
    t_clicks = models.IntegerField(null=True)
    system_ranking = ArrayField(models.IntegerField(blank=False))
    user_ranking = ArrayField(models.IntegerField(blank=False))

    class Meta:
        unique_together = ('participant', 'system',)