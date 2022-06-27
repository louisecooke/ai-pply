from rest_framework import serializers
from ..models.questionnaire_models import Question, Option, Smiley, Answer

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'variant', 'text')

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

class SmileySerializer(serializers.ModelSerializer):
    class Meta:
        model = Smiley
        fields = ('id', 'value', 'image')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('question', 'option', 'participant', 'system')


