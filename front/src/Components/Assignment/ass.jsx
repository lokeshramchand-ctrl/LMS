import React from 'react';
import { Calendar, Clock, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * Dynamic Assignments Page Component
 * 
 * @param {Object} course - Course information object
 * @param {string} course.title - Course title (from Django: {{ course.title }})
 * @param {string} course.code - Course code (optional)
 * @param {string} course.color - Theme color for the course (optional, defaults to blue)
 * 
 * @param {Array} assignments - Array of assignment objects (from Django: assignments context)
 * @param {number} assignment.id - Assignment ID (for Django URL routing)
 * @param {string} assignment.title - Assignment title
 * @param {string} assignment.submission_deadline - ISO date string or Django datetime
 * @param {string} assignment.status - 'pending', 'submitted', or other status
 * @param {number} assignment.points - Points value (optional)
 * 
 * @param {Function} onSubmitAssignment - Callback function for assignment submission
 * 
 * Usage with Django:
 * <AssignmentsPage 
 *   course={{ title: "{{ course.title }}", code: "{{ course.code }}" }}
 *   assignments={[
 *     {% for assignment in assignments %}
 *       {
 *         id: {{ assignment.id }},
 *         title: "{{ assignment.title }}",
 *         submission_deadline: "{{ assignment.submission_deadline|date:'c' }}",
 *         status: "{{ assignment.status }}",
 *         points: {{ assignment.points|default:0 }}
 *       }{% if not forloop.last %},{% endif %}
 *     {% endfor %}
 *   ]}
 *   onSubmitAssignment={(id) => window.location.href = `{% url 'submit_assignment' 0 %}`.replace('0', id)}
 * />
 */

const AssignmentsPage = ({ 
  course = { title: "Course Title", code: "COURSE-001", color: "#6366f1" }, 
  assignments = [],
  onSubmitAssignment = null 
}) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDue = (dateString) => {
    const due = new Date(dateString);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil) => {
    if (daysUntil < 0) return 'text-red-600';
    if (daysUntil <= 3) return 'text-orange-600';
    if (daysUntil <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleSubmitAssignment = (assignmentId) => {
    // Call the parent component's submit handler if provided
    if (onSubmitAssignment && typeof onSubmitAssignment === 'function') {
      onSubmitAssignment(assignmentId);
    } else {
      // Default behavior - you can customize this for your Django integration
      console.log(`Submitting assignment ${assignmentId}`);
      // For Django integration, this could be:
      // window.location.href = `/submit_assignment/${assignmentId}/`;
      // or make an API call to your Django backend
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: course.color,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
            }}>
              <BookOpen size={28} color="white" />
            </div>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'white',
                margin: '0',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Assignments for {course.title}
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0.5rem 0 0 0',
                fontSize: '1.1rem'
              }}>
                {course.code && `${course.code} • `}{assignments.length} Assignment{assignments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Total Assignments
            </div>
            <div style={{ color: 'white', fontSize: '2rem', fontWeight: '700' }}>
              {assignments.length}
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Completed
            </div>
            <div style={{ color: 'white', fontSize: '2rem', fontWeight: '700' }}>
              {assignments.filter(a => a.status === 'submitted').length}
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Total Points
            </div>
            <div style={{ color: 'white', fontSize: '2rem', fontWeight: '700' }}>
              {assignments.reduce((sum, a) => sum + (a.points || 0), 0)}
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {assignments.map((assignment) => {
            const daysUntil = getDaysUntilDue(assignment.submission_deadline);
            const isOverdue = daysUntil < 0;
            const isSubmitted = assignment.status === 'submitted';
            
            return (
              <div
                key={assignment.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Status Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {isSubmitted && (
                    <>
                      <CheckCircle size={20} color="#10b981" />
                      <span style={{
                        color: '#10b981',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}>
                        Submitted
                      </span>
                    </>
                  )}
                  <div style={{
                    background: course.color || '#6366f1',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {assignment.points ? `${assignment.points} pts` : 'Assignment'}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      margin: '0 0 0.5rem 0',
                      paddingRight: '8rem'
                    }}>
                      {assignment.title}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        <Calendar size={16} />
                        <span>{formatDate(assignment.submission_deadline)}</span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Clock size={16} className={getUrgencyColor(daysUntil)} />
                        <span style={{
                          color: isOverdue ? '#ef4444' : 
                                 daysUntil <= 3 ? '#f59e0b' :
                                 daysUntil <= 7 ? '#eab308' : '#10b981',
                          fontWeight: '500'
                        }}>
                          {isOverdue ? `Overdue by ${Math.abs(daysUntil)} days` :
                           daysUntil === 0 ? 'Due today' :
                           daysUntil === 1 ? 'Due tomorrow' :
                           `Due in ${daysUntil} days`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isSubmitted && (
                    <button
                      onClick={() => handleSubmitAssignment(assignment.id)}
                      style={{
                        background: isOverdue ? '#ef4444' : (course.color || '#6366f1'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        alignSelf: 'flex-start',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                    >
                      {isOverdue ? 'Submit (Overdue)' : 'Submit Assignment'}
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {assignments.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '4rem 2rem'
          }}>
            <BookOpen size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No assignments yet</h3>
            <p>Check back later for new assignments in this course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;
