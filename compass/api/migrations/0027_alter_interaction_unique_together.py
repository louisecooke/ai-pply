# Generated by Django 4.0.4 on 2022-08-01 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_rename_participant_id_interaction_participant_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='interaction',
            unique_together={('participant', 'system')},
        ),
    ]
