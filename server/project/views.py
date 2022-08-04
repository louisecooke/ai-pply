from django.shortcuts import render

def front(request, second):
    context = { }
    return render(request, "index.html", context)