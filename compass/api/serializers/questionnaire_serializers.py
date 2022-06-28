from rest_framework import serializers
from ..models.questionnaire_models import Question, Option, Smiley, Answer, Scale

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

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

class ScaleSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model = Scale
        fields = ('id', 'title', 'options')