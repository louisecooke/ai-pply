from django.contrib import admin

from .localization import Administration
from .models.system_models import Participant, Completion, System
from .models.questionnaire_models import Question, Answer, Option, Scale
from typing import final

admin.site.site_header = Administration.header


class ReadOnly(admin.ModelAdmin):

    @final
    def has_add_permission(self, request):
        return False


class ParticipantAdmin(ReadOnly):
    pass

class QuestionAdmin(admin.ModelAdmin):
    list_display = ("text", "variant", "scale")

class OptionAdmin(admin.ModelAdmin):
    list_display = ("text", "image", "scale")

class AnswerAdmin(admin.ModelAdmin):
    list_display = ("question", "option", "system", "participant")

class ScaleAdmin(admin.ModelAdmin):
    display = ("title")

admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Scale, ScaleAdmin)

admin.site.register(Participant)
admin.site.register(Completion)
admin.site.register(System)
