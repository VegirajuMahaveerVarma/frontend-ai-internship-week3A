import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Bell, CalendarDays, Check, ChevronDown, CircleHelp,
  Clock3, LayoutDashboard, Menu, Plus, Search, Settings, Sparkles,
  Target, TrendingUp, X, Zap
} from 'lucide-react';
import './styles.css';

const initialTasks = [
  { id: 1, title: 'Finish React component review', tag: 'Work', due: 'Today', priority: 'High', done: false },
  { id: 2, title: 'Read 20 pages of Design Patterns', tag: 'Study', due: 'Today', priority: 'Medium', done: false },
  { id: 3, title: 'Update internship portfolio', tag: 'Career', due: 'Tomorrow', priority: 'High', done: true },
  { id: 4, title: 'Plan weekend project sprint', tag: 'Personal', due: 'Friday', priority: 'Low', done: false }
];

const suggestions = [
  { title: 'Deep Work Block', detail: '60 min · best focus window', icon: Zap },
  { title: 'Quick Win', detail: '15 min · clear 2 small tasks', icon: Target },
  { title: 'Weekly Review', detail: '20 min · reflect and plan', icon: TrendingUp }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [activeNav, setActiveNav] = useState('Overview');

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const filteredTasks = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tasks;
    return tasks.filter((task) =>
      [task.title, task.tag, task.priority, task.due].some((field) =>
        field.toLowerCase().includes(value)
      )
    );
  }, [query, tasks]);

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) => task.id === id ? { ...task, done: !task.done } : task)
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((current) => [
      {
        id: Date.now(),
        title: newTask.trim(),
        tag: 'Personal',
        due: 'Today',
        priority: 'Medium',
        done: false
      },
      ...current
    ]);
    setNewTask('');
    setShowAdd(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} /></div>
          <span>FocusFlow</span>
        </div>

        <nav>
          {['Overview', 'Tasks', 'Calendar', 'Insights'].map((item) => {
            const Icon = item === 'Overview' ? LayoutDashboard :
              item === 'Tasks' ? Check :
              item === 'Calendar' ? CalendarDays : TrendingUp;
            return (
              <button
                key={item}
                className={activeNav === item ? 'nav-item active' : 'nav-item'}
                onClick={() => { setActiveNav(item); setMenuOpen(false); }}
              >
                <Icon size={18} />
                <span>{item}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <div className="mini-orb"><Sparkles size={16} /></div>
          <strong>AI planning assistant</strong>
          <p>Turn a busy day into a realistic plan in seconds.</p>
          <button onClick={() => setShowAdd(true)}>
            Try it <ArrowRight size={15} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={18} /><span>Settings</span></button>
          <div className="profile">
            <div className="avatar">MV</div>
            <div>
              <strong>Mahaveer</strong>
              <span>Student workspace</span>
            </div>
          </div>
        </div>
      </aside>

      {menuOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <div className="mobile-brand-row">
            <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
            <div>
              <span className="eyebrow">Tuesday, September 22</span>
              <h1>{activeNav}</h1>
            </div>
          </div>
          <div className="top-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                placeholder="Search tasks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tasks"
              />
              {query && <button className="clear-search" onClick={() => setQuery('')}><X size={15} /></button>}
            </label>
            <button className="icon-btn"><Bell size={18} /></button>
            <button className="add-btn" onClick={() => setShowAdd(true)}>
              <Plus size={18} /> Add task
            </button>
          </div>
        </header>

        <section className="hero-card">
          <div>
            <span className="kicker">GOOD EVENING</span>
            <h2>Make progress, not just plans.</h2>
            <p>You have {tasks.filter(t => !t.done).length} open tasks. Protect your focus and finish the work that matters most.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setShowAdd(true)}>Plan my next task <ArrowRight size={16} /></button>
              <button className="ghost-btn">View insights</button>
            </div>
          </div>
          <div className="progress-ring" style={{ '--progress': progress }}>
            <div className="ring-inner">
              <strong>{progress}%</strong>
              <span>today</span>
            </div>
          </div>
        </section>

        <section className="metrics-grid">
          <Metric icon={Check} label="Completed" value={completed.toString()} helper="today" />
          <Metric icon={Clock3} label="Focus time" value="3h 40m" helper="+12% this week" trend />
          <Metric icon={Target} label="Current streak" value="7 days" helper="personal best" />
          <Metric icon={TrendingUp} label="Productivity" value="+18%" helper="vs. last week" trend />
        </section>

        <section className="content-grid">
          <div className="panel tasks-panel">
            <div className="panel-head">
              <div>
                <span className="section-label">YOUR DAY</span>
                <h3>Today’s tasks</h3>
              </div>
              <button className="text-btn" onClick={() => setShowAdd(true)}>Add task <Plus size={15} /></button>
            </div>

            <div className="task-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <Search size={22} />
                  <strong>No tasks found</strong>
                  <span>Try a different search term.</span>
                </div>
              ) : filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>
          </div>

          <div className="panel side-panel">
            <div className="panel-head">
              <div>
                <span className="section-label">AI PICKS</span>
                <h3>Suggested next steps</h3>
              </div>
              <Sparkles size={18} className="muted-icon" />
            </div>

            <div className="suggestion-list">
              {suggestions.map(({ title, detail, icon: Icon }) => (
                <button className="suggestion" key={title} onClick={() => setShowAdd(true)}>
                  <span className="suggestion-icon"><Icon size={17} /></span>
                  <span className="suggestion-copy">
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>

            <div className="focus-card">
              <div className="focus-top">
                <span><Sparkles size={15} /> AI focus score</span>
                <span>8.6/10</span>
              </div>
              <div className="score-bar"><span style={{ width: '86%' }} /></div>
              <p>Your workload is balanced. Finish one high-priority task before opening new work.</p>
            </div>
          </div>
        </section>

        <section className="panel activity-panel">
          <div className="panel-head">
            <div>
              <span className="section-label">WEEKLY SNAPSHOT</span>
              <h3>Momentum</h3>
            </div>
            <button className="select-btn">This week <ChevronDown size={15} /></button>
          </div>
          <div className="chart">
            {[52, 66, 58, 82, 74, 91, 68].map((height, index) => (
              <div className="chart-col" key={index}>
                <div className="chart-bar"><span style={{ height: `${height}%` }} /></div>
                <small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showAdd && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-head">
              <div>
                <span className="section-label">QUICK CAPTURE</span>
                <h3 id="modal-title">Add a task</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowAdd(false)}><X size={18} /></button>
            </div>
            <input
              autoFocus
              className="task-input"
              placeholder="What needs to get done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
            />
            <div className="modal-hint"><CircleHelp size={15} /> Press Enter to add it to today</div>
            <div className="modal-actions">
              <button className="ghost-btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="primary-btn" onClick={addTask} disabled={!newTask.trim()}>Add task <Plus size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ icon: Icon, label, value, helper, trend }) {
  return (
    <div className="metric-card">
      <div className="metric-icon"><Icon size={17} /></div>
      <div className="metric-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={trend ? 'positive' : ''}>{helper}</small>
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle }) {
  return (
    <div className={`task-row ${task.done ? 'done' : ''}`}>
      <button className={`check-btn ${task.done ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={task.done ? 'Mark task incomplete' : 'Mark task complete'}>
        {task.done && <Check size={14} />}
      </button>
      <div className="task-content">
        <strong>{task.title}</strong>
        <div className="task-meta">
          <span className="tag">{task.tag}</span>
          <span>{task.due}</span>
        </div>
      </div>
      <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);