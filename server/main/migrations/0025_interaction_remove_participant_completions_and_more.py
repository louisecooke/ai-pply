# Generated by Django 4.0.4 on 2022-08-01 12:36

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_participant_creationtime'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('total_time', models.IntegerField(null=True)),
                ('a_changes', models.IntegerField(null=True)),
                ('c_changes', models.IntegerField(null=True)),
                ('t_clicks', models.IntegerField(null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='participant',
            name='completions',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='creationTime',
        ),
        migrations.AddField(
            model_name='participant',
            name='interactions',
            field=models.ManyToManyField(blank=True, through='api.Interaction', to='api.system'),
        ),
        migrations.AddField(
            model_name='participant',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Completion',
        ),
        migrations.AddField(
            model_name='interaction',
            name='participant_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.participant', verbose_name='related participant'),
        ),
        migrations.AddField(
            model_name='interaction',
            name='system_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.system', verbose_name='related system'),
        ),
    ]
