# Generated by Django 4.0.4 on 2022-06-27 13:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_rename_systems_participant_completions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.question', verbose_name='question'),
        ),
    ]
