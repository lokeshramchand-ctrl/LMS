from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Course, Enrollment, Assignment, Submission
from .forms import EnrollmentForm, SubmissionForm

# List all courses
def course_list(request):
    courses = Course.objects.all()
    return render(request, 'course_list.html', {'courses': courses})

# View details of a course
@login_required
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    modules = course.modules.all()
    return render(request, 'course_detail.html', {'course': course, 'modules': modules})

# Enroll in a course
@login_required
def enroll_course(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    if request.method == 'POST':
        form = EnrollmentForm(request.POST)
        if form.is_valid():
            enrollment = form.save(commit=False)
            enrollment.user = request.user
            enrollment.course = course
            enrollment.save()
            return redirect('course_detail', course_id=course_id)
    else:
        form = EnrollmentForm()
    return render(request, 'enroll_course.html', {'form': form, 'course': course})
# View assignments in a course
@login_required
def assignment_list(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    assignments = course.assignments.all()
    return render(request, 'assignment_list.html', {'course': course, 'assignments': assignments})

# Submit an assignment
@login_required
def submit_assignment(request, assignment_id):
    assignment = get_object_or_404(Assignment, id=assignment_id)
    if request.method == 'POST':
        form = SubmissionForm(request.POST, request.FILES)
        if form.is_valid():
            submission = form.save(commit=False)
            submission.user = request.user
            submission.assignment = assignment
            submission.save()
            return redirect('assignment_list', course_id=assignment.course.id)
    else:
        form = SubmissionForm()
    return render(request, 'submit_assignment.html', {'form': form, 'assignment': assignment})
