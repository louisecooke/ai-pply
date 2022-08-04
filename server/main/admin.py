from django.contrib import admin

from .localization import Administration
from .models.system_models import Participant, Interaction, System
from .models.questionnaire_models import Question, Answer, Option, Scale
from typing import final
from import_export.admin import ImportExportModelAdmin

admin.site.site_header = Administration.header

class ReadOnly(admin.ModelAdmin):
    @final
    def has_add_permission(self, request):
        return False

class ParticipantAdmin(ImportExportModelAdmin, ReadOnly):
    list_display = ("id", "timestamp", "gender", "age", "education")

class QuestionAdmin(ImportExportModelAdmin):
    list_display = ("text", "variant", "scale")

class OptionAdmin(ImportExportModelAdmin):
    list_display = ("text", "image", "scale")

class AnswerAdmin(ImportExportModelAdmin, ReadOnly):
    list_display = ("question", "option", "system", "participant")

class ScaleAdmin(ImportExportModelAdmin):
    list_display = ("title",)

class SystemAdmin(ImportExportModelAdmin):
    list_display = ("id", "title", "transparency", "control", "image", "description")

class InteractionAdmin(ImportExportModelAdmin, ReadOnly):
    list_display = ("participant_id", "system_id", "timestamp", "system_ranking", "user_ranking", "total_time", "a_changes", "c_changes", "t_clicks")

admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Scale, ScaleAdmin)

admin.site.register(Participant, ParticipantAdmin)
admin.site.register(Interaction, InteractionAdmin)
admin.site.register(System, SystemAdmin)

