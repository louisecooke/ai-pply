# Generated by Django 4.0.4 on 2022-06-27 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_smiley_remove_option_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='option',
        ),
        migrations.AddField(
            model_name='answer',
            name='value',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
