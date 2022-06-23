# Generated by Django 4.0.4 on 2022-06-22 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_completion_time_option_value_question_variant_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='question',
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='api.question', verbose_name='associated question'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='option',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.option', verbose_name='chosen option'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.participant', verbose_name='participant'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='system',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='api.system', verbose_name='evaluated system'),
        ),
        migrations.AlterField(
            model_name='completion',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.participant', verbose_name='related participant'),
        ),
        migrations.AlterField(
            model_name='completion',
            name='system',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.system', verbose_name='related system'),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.CharField(max_length=400),
        ),
    ]
