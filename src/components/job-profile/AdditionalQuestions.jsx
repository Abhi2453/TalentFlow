
import React, { useState } from 'react';
import { 
  addCommonQuestion, 
  updateCommonQuestionById, 
  deleteCommonQuestionById 
} from '../../data/db';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  HelpCircle, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Code,
  Users,
  Brain,
  Target,
  DollarSign,
  FileText,
  Lightbulb
} from 'lucide-react';

const AdditionalQuestions = ({ jobId, questions, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answer: '',
    category: 'Technical',
    isEditable: true
  });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = ['Technical', 'Behavioral', 'Problem Solving', 'Cultural Fit', 'Compensation', 'Other'];

  const handleAddQuestion = async () => {
    if (!newQuestion.question.trim()) {
      alert('Question text is required');
      return;
    }

    try {
      setSaving(true);
      await addCommonQuestion(jobId, newQuestion);
      setNewQuestion({ question: '', answer: '', category: 'Technical', isEditable: true });
      setIsAdding(false);
      onUpdate();
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuestion.question.trim()) {
      alert('Question text is required');
      return;
    }

    try {
      setSaving(true);
      await updateCommonQuestionById(jobId, editingId, editingQuestion);
      setEditingId(null);
      setEditingQuestion(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Failed to update question');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      setSaving(true);
      await deleteCommonQuestionById(jobId, questionId);
      onUpdate();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (question) => {
    setEditingId(question.id);
    setEditingQuestion({ ...question });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingQuestion(null);
  };

  const getCategoryConfig = (category) => {
    const configs = {
      'Technical': { 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        border: 'border-blue-200',
        icon: Code,
        iconColor: 'text-blue-600',
        gradient: 'from-blue-50 to-cyan-50'
      },
      'Behavioral': { 
        bg: 'bg-green-50', 
        text: 'text-green-700', 
        border: 'border-green-200',
        icon: Users,
        iconColor: 'text-green-600',
        gradient: 'from-green-50 to-emerald-50'
      },
      'Problem Solving': { 
        bg: 'bg-purple-50', 
        text: 'text-purple-700', 
        border: 'border-purple-200',
        icon: Brain,
        iconColor: 'text-purple-600',
        gradient: 'from-purple-50 to-violet-50'
      },
      'Cultural Fit': { 
        bg: 'bg-pink-50', 
        text: 'text-pink-700', 
        border: 'border-pink-200',
        icon: Target,
        iconColor: 'text-pink-600',
        gradient: 'from-pink-50 to-rose-50'
      },
      'Compensation': { 
        bg: 'bg-yellow-50', 
        text: 'text-yellow-700', 
        border: 'border-yellow-200',
        icon: DollarSign,
        iconColor: 'text-yellow-600',
        gradient: 'from-yellow-50 to-amber-50'
      },
      'Other': { 
        bg: 'bg-gray-50', 
        text: 'text-gray-700', 
        border: 'border-gray-200',
        icon: FileText,
        iconColor: 'text-gray-600',
        gradient: 'from-gray-50 to-slate-50'
      }
    };
    return configs[category] || configs['Other'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="text-indigo-600" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Additional Questions</h2>
                <p className="text-sm text-gray-600">
                  Common interview questions and answer guidelines
                </p>
              </div>
            </div>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-2 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200 font-medium shadow-sm"
              >
                <Plus size={18} />
                Add Question
              </button>
            )}
          </div>
        </div>

        {/* Questions Count */}
        {questions.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="font-semibold text-gray-800">{questions.length}</span> question{questions.length !== 1 ? 's' : ''} added
            </p>
          </div>
        )}
      </div>

      {/* Add New Question Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Plus size={20} className="text-indigo-600" />
              Add New Question
            </h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Tip: Write clear, specific questions</p>
                <p className="mt-1">Include what you're looking to assess and provide guidance for interviewers.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                rows={3}
                placeholder="e.g., Describe a challenging project you worked on and how you overcame obstacles..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Answer Guidelines / Expected Response
              </label>
              <textarea
                value={newQuestion.answer}
                onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                rows={4}
                placeholder="What should the interviewer look for? Key points to assess, red flags, ideal responses..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newQuestion.category}
                onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleAddQuestion}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Add Question
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewQuestion({ question: '', answer: '', category: 'Technical', isEditable: true });
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                disabled={saving}
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, index) => {
          const categoryConfig = getCategoryConfig(question.category);
          const CategoryIcon = categoryConfig.icon;
          
          return (
            <div key={question.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {editingId === question.id ? (
                // Edit Mode
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Edit3 size={20} className="text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Edit Question {index + 1}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Question <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={editingQuestion.question}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Answer Guidelines
                      </label>
                      <textarea
                        value={editingQuestion.answer}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={editingQuestion.category}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleUpdateQuestion}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        disabled={saving}
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${categoryConfig.gradient} px-6 py-4 border-b border-gray-200`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-sm">
                          {index + 1}
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${categoryConfig.bg} ${categoryConfig.text} border ${categoryConfig.border} flex items-center gap-2`}>
                          <CategoryIcon size={16} className={categoryConfig.iconColor} />
                          {question.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(question)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-indigo-600 transition-all"
                          title="Edit question"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-red-600 transition-all"
                          title="Delete question"
                          disabled={saving}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare size={18} className="text-gray-500" />
                        <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Question</h3>
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed">
                        {question.question}
                      </p>
                    </div>

                    {question.answer && (
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb size={18} className="text-amber-600" />
                          <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Answer Guidelines</h3>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {questions.length === 0 && !isAdding && (
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 overflow-hidden">
            <div className="p-12 text-center">
              <HelpCircle className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Questions Added Yet</h3>
              <p className="text-gray-500 mb-4">
                Start building your interview question bank
              </p>
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <Plus size={20} />
                Add Your First Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalQuestions;
