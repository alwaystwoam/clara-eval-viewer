/**
 * Clara AI Eval Viewer - Main Application
 */

// State
let filteredTestCases = [];
let sortColumn = 'id';
let sortDirection = 'asc';
let expandedRow = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Set initial filtered data
  filteredTestCases = [...EVAL_DATA.testCases];
  
  // Render all components
  renderHeader();
  renderSummaryCards();
  renderAssessmentPanel();
  renderSectionBreakdown();
  renderFilters();
  renderTestTable();
  
  // Show hidden elements
  document.getElementById('assessment-panel').style.display = 'block';
  document.getElementById('section-breakdown').style.display = 'block';
  document.getElementById('filters').style.display = 'flex';
  document.getElementById('test-table-container').style.display = 'block';
  
  // Set up event listeners
  setupEventListeners();
}

// Render header with overall grade
function renderHeader() {
  const gradeEl = document.getElementById('header-grade');
  const passRateEl = document.getElementById('header-pass-rate');
  
  gradeEl.textContent = EVAL_DATA.overallGrade;
  gradeEl.className = 'grade-badge ' + getGradeColorClass(EVAL_DATA.overallGrade);
  passRateEl.textContent = (EVAL_DATA.passRate * 100).toFixed(1) + '%';
}

// Render summary cards
function renderSummaryCards() {
  const container = document.getElementById('summary-grid');
  
  container.innerHTML = `
    <div class="summary-card">
      <div class="summary-card-label">Total Tests</div>
      <div class="summary-card-value">${EVAL_DATA.totalTests}</div>
      <div class="summary-card-sub">${EVAL_DATA.passedTests} passed, ${EVAL_DATA.failedTests} failed</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">Pass Rate</div>
      <div class="summary-card-value ${EVAL_DATA.passRate >= 0.7 ? 'pass' : EVAL_DATA.passRate >= 0.5 ? 'warning' : 'fail'}">${(EVAL_DATA.passRate * 100).toFixed(1)}%</div>
      <div class="summary-card-sub">Target: 80%</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">Average Score</div>
      <div class="summary-card-value ${EVAL_DATA.avgScore >= 0.75 ? 'pass' : EVAL_DATA.avgScore >= 0.5 ? 'warning' : 'fail'}">${(EVAL_DATA.avgScore * 100).toFixed(1)}%</div>
      <div class="summary-card-sub">Across all dimensions</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">Style Score</div>
      <div class="summary-card-value ${EVAL_DATA.avgStyleScore >= 70 ? 'pass' : EVAL_DATA.avgStyleScore >= 50 ? 'warning' : 'fail'}">${EVAL_DATA.avgStyleScore.toFixed(0)}</div>
      <div class="summary-card-sub">Grade: ${EVAL_DATA.styleGrade}</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">Avg Response Time</div>
      <div class="summary-card-value">${(EVAL_DATA.avgResponseTime / 1000).toFixed(1)}s</div>
      <div class="summary-card-sub">Per test case</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">Preferred Response</div>
      <div class="summary-card-value" style="font-size: 0.9rem;">
        <span style="color: var(--color-pass)">Clara: ${EVAL_DATA.preferredBreakdown.actual}</span>
        <span style="color: var(--color-warning)">Tie: ${EVAL_DATA.preferredBreakdown.similar}</span>
        <span style="color: var(--color-fail)">Exp: ${EVAL_DATA.preferredBreakdown.expected}</span>
      </div>
    </div>
  `;
}

// Render overall assessment panel
function renderAssessmentPanel() {
  const container = document.getElementById('assessment-panel');
  
  // Find best and worst sections
  const sections = Object.entries(EVAL_DATA.sectionPerformance)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.passRate - a.passRate);
  
  const bestSections = sections.filter(s => s.passRate >= 0.7).slice(0, 4);
  const worstSections = sections.filter(s => s.passRate < 0.5).slice(-4).reverse();
  
  // Calculate my assessment metrics
  const lookupPassRate = calculateCategoryPassRate('Lookups');
  const executionPassRate = calculateCategoryPassRate('Direct Execution');
  const proposePassRate = calculateCategoryPassRate('Propose');
  
  container.innerHTML = `
    <div class="assessment-header">
      <div>
        <div class="assessment-title">Overall Agent Assessment</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.25rem;">
          Clara AI Agent - AGI Summit Riyadh 2026 Evaluation
        </div>
      </div>
      <div class="assessment-grade-large">
        <div class="assessment-grade-badge ${getGradeColorClass(EVAL_DATA.overallGrade)}">${EVAL_DATA.overallGrade}</div>
        <div class="assessment-grade-label">Overall Grade</div>
      </div>
    </div>
    
    <!-- My Verdict Section -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span style="font-size: 1.25rem;">📊</span>
        <span style="font-weight: 600; color: var(--accent-purple);">My Verdict</span>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.7; margin-bottom: 1rem;">
        <strong style="color: var(--text-primary);">Clara is a capable assistant that excels at information retrieval but struggles with action execution.</strong>
        With a ${(EVAL_DATA.passRate * 100).toFixed(0)}% pass rate and ${(EVAL_DATA.avgScore * 100).toFixed(0)}% average score, the agent demonstrates 
        strong comprehension of event data (${(lookupPassRate * 100).toFixed(0)}% on lookups) but fails to reliably execute changes 
        (${(executionPassRate * 100).toFixed(0)}% on direct execution) or follow proper confirmation flows (${(proposePassRate * 100).toFixed(0)}% on propose+confirm).
      </p>
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.7; margin-bottom: 1rem;">
        <strong style="color: var(--text-primary);">The core issue is behavioral, not capability-based.</strong> Clara has the tools and knowledge 
        to perform well, but lacks clear decision rules for when to ask questions vs. execute vs. propose. This is fixable with 
        targeted system prompt engineering and better few-shot examples.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div style="text-align: center; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Information Retrieval</div>
          <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--color-pass);">${(lookupPassRate * 100).toFixed(0)}%</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Action Execution</div>
          <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--color-warning);">${(executionPassRate * 100).toFixed(0)}%</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Proposal Flows</div>
          <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--color-fail);">${(proposePassRate * 100).toFixed(0)}%</div>
        </div>
        <div style="text-align: center; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Production Ready?</div>
          <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--color-fail);">No</div>
        </div>
      </div>
    </div>
    
    <div class="assessment-content">
      <div class="assessment-section">
        <h4><span style="color: var(--color-pass)">✓</span> Strengths</h4>
        <ul class="assessment-list strengths">
          ${bestSections.map(s => `<li>${s.name}: ${(s.passRate * 100).toFixed(0)}% pass rate</li>`).join('')}
          ${bestSections.length === 0 ? '<li>No sections above 70% pass rate</li>' : ''}
          <li>Strong comprehension of event data and context</li>
          <li>Good response clarity and formatting (avg ${(calculateDimensionAvg('responseClarity') * 100).toFixed(0)}%)</li>
          <li>Knows capability boundaries (80% on unsupported requests)</li>
        </ul>
      </div>
      
      <div class="assessment-section">
        <h4><span style="color: var(--color-fail)">✗</span> Critical Weaknesses</h4>
        <ul class="assessment-list weaknesses">
          ${worstSections.map(s => `<li>${s.name}: ${(s.passRate * 100).toFixed(0)}% pass rate</li>`).join('')}
          <li>Asks for confirmation when should execute directly</li>
          <li>Executes when should ask clarifying questions</li>
          <li>Missing [A]/[B]/[C] confirmation UI on complex changes</li>
        </ul>
      </div>
      
      <div class="assessment-section">
        <h4><span style="color: var(--accent-purple)">⚡</span> Root Cause Analysis</h4>
        <ul class="assessment-list">
          <li><strong>Missing capability awareness</strong> — Agent doesn't know what features exist (Export: 11%)</li>
          <li><strong>Unclear execution rules</strong> — When to confirm vs execute directly (Schedule: 17%)</li>
          <li><strong>Weak clarification instinct</strong> — Defaults to action over questions (Vague: 40%)</li>
          <li><strong>Inconsistent confirmation patterns</strong> — Propose flows need work (0-60%)</li>
        </ul>
      </div>
      
      <div class="assessment-section">
        <h4><span style="color: var(--accent-blue)">🎯</span> Priority Fixes (Ranked)</h4>
        <ul class="assessment-list">
          <li><strong>1.</strong> Add decision tree: execute vs confirm vs clarify</li>
          <li><strong>2.</strong> Add explicit capability list to system prompt</li>
          <li><strong>3.</strong> Fix schedule mutation tool definitions</li>
          <li><strong>4.</strong> Add few-shot examples for edge cases</li>
          <li><strong>5.</strong> Implement [A]/[B]/[C] confirmation pattern</li>
        </ul>
      </div>
    </div>
    
    <!-- Style Analysis Summary -->
    <div style="margin-top: 1.5rem; padding: 1.25rem; background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: var(--radius-md);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span style="font-size: 1.25rem;">🎨</span>
        <span style="font-weight: 600; color: #ec4899;">Style & Tone Analysis</span>
        <span class="test-grade ${getGradeColorClass(EVAL_DATA.styleGrade)}" style="margin-left: auto;">${EVAL_DATA.styleGrade}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; text-align: center;">
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Avg Tone</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: ${getToneColor(EVAL_DATA.avgTone)}">${EVAL_DATA.avgTone.toFixed(1)}/5</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Avg Conciseness</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: ${getConcisenessColor(EVAL_DATA.avgConciseness)}">${EVAL_DATA.avgConciseness.toFixed(1)}/5</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Avg Helpfulness</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: ${getHelpfulnessColor(EVAL_DATA.avgHelpfulness)}">${EVAL_DATA.avgHelpfulness.toFixed(1)}/5</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Style Score</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: ${getStyleScoreColor(EVAL_DATA.avgStyleScore)}">${EVAL_DATA.avgStyleScore.toFixed(0)}/100</div>
        </div>
      </div>
      <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Preferred Response Analysis</div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="color: var(--color-pass);">✓ Clara Better: <strong>${EVAL_DATA.preferredBreakdown.actual}</strong></span>
          <span style="color: var(--color-warning);">≈ Similar: <strong>${EVAL_DATA.preferredBreakdown.similar}</strong></span>
          <span style="color: var(--color-fail);">✗ Expected Better: <strong>${EVAL_DATA.preferredBreakdown.expected}</strong></span>
        </div>
      </div>
    </div>
    
    <!-- Expected Improvement Section -->
    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-elevated); border-radius: var(--radius-md);">
      <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem;">Expected Improvement with Fixes</div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
        <div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Current</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--color-warning);">${(EVAL_DATA.passRate * 100).toFixed(0)}%</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">After Quick Fixes</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--color-grade-b);">~65%</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Target</div>
          <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--color-pass);">80%+</div>
        </div>
      </div>
    </div>
  `;
}

// Calculate pass rate for a category of sections
function calculateCategoryPassRate(categoryPrefix) {
  const relevantTests = EVAL_DATA.testCases.filter(tc => tc.section.includes(categoryPrefix));
  if (relevantTests.length === 0) return 0;
  return relevantTests.filter(tc => tc.passed).length / relevantTests.length;
}

// Calculate average dimension score
function calculateDimensionAvg(dimension) {
  const scores = EVAL_DATA.testCases.map(tc => tc.dimensions[dimension]?.score || 0);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// Render section breakdown
function renderSectionBreakdown() {
  const container = document.getElementById('section-content');
  
  const sections = Object.entries(EVAL_DATA.sectionPerformance)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.passRate - a.passRate);
  
  container.innerHTML = sections.map(section => {
    const color = getPassRateColor(section.passRate);
    return `
      <div class="section-bar">
        <div class="section-bar-name" title="${section.name}">${section.name}</div>
        <div class="section-bar-track">
          <div class="section-bar-fill" style="width: ${section.passRate * 100}%; background: ${color};"></div>
        </div>
        <div class="section-bar-value" style="color: ${color}">${(section.passRate * 100).toFixed(0)}%</div>
      </div>
    `;
  }).join('');
}

// Render filters
function renderFilters() {
  const sectionSelect = document.getElementById('filter-section');
  const sections = [...new Set(EVAL_DATA.testCases.map(t => t.section))].sort();
  
  sectionSelect.innerHTML = '<option value="">All Sections</option>' +
    sections.map(s => `<option value="${s}">${s}</option>`).join('');
  
  // Add event listeners
  document.getElementById('filter-section').addEventListener('change', applyFilters);
  document.getElementById('filter-status').addEventListener('change', applyFilters);
  document.getElementById('filter-min-score').addEventListener('input', applyFilters);
  document.getElementById('filter-search').addEventListener('input', applyFilters);
}

// Apply filters
function applyFilters() {
  const section = document.getElementById('filter-section').value;
  const status = document.getElementById('filter-status').value;
  const minScore = parseFloat(document.getElementById('filter-min-score').value) || 0;
  const search = document.getElementById('filter-search').value.toLowerCase();
  
  filteredTestCases = EVAL_DATA.testCases.filter(tc => {
    if (section && tc.section !== section) return false;
    if (status === 'pass' && !tc.passed) return false;
    if (status === 'fail' && tc.passed) return false;
    if (tc.overallScore < minScore) return false;
    if (search && !tc.prompt.toLowerCase().includes(search) && !tc.id.toLowerCase().includes(search)) return false;
    return true;
  });
  
  expandedRow = null;
  renderTestTable();
}

// Reset filters
function resetFilters() {
  document.getElementById('filter-section').value = '';
  document.getElementById('filter-status').value = '';
  document.getElementById('filter-min-score').value = '';
  document.getElementById('filter-search').value = '';
  filteredTestCases = [...EVAL_DATA.testCases];
  expandedRow = null;
  renderTestTable();
}

// Export to CSV
function exportCSV() {
  const headers = ['ID', 'Section', 'Prompt', 'Status', 'Score', 'Grade', 'Expected', 'Actual', 'Summary'];
  const rows = filteredTestCases.map(tc => [
    tc.id,
    tc.section,
    `"${tc.prompt.replace(/"/g, '""')}"`,
    tc.passed ? 'Pass' : 'Fail',
    tc.overallScore.toFixed(2),
    getGrade(tc.overallScore),
    `"${tc.expectedResponse.replace(/"/g, '""')}"`,
    `"${tc.actualResponse.replace(/"/g, '""')}"`,
    `"${tc.summary.replace(/"/g, '""')}"`
  ]);
  
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clara-eval-export-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Render test table
function renderTestTable() {
  const tbody = document.getElementById('test-table-body');
  
  // Sort data
  const sorted = [...filteredTestCases].sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    if (sortColumn === 'passed') {
      aVal = a.passed ? 1 : 0;
      bVal = b.passed ? 1 : 0;
    }
    
    if (typeof aVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });
  
  if (sorted.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No test cases match your filters</td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = sorted.map(tc => {
    const grade = getGrade(tc.overallScore);
    const isExpanded = expandedRow === tc.id;
    
    return `
      <tr class="${isExpanded ? 'expanded' : ''}" data-id="${tc.id}" onclick="toggleRow('${tc.id}')">
        <td><span class="test-id">${tc.id}</span></td>
        <td><span class="test-section">${tc.section}</span></td>
        <td><span class="test-prompt" title="${escapeHtml(tc.prompt)}">${escapeHtml(tc.prompt)}</span></td>
        <td>
          <span class="test-status ${tc.passed ? 'pass' : 'fail'}" title="${tc.passed ? 'Passed' : 'Failed'}">
            ${tc.passed ? '✓' : '✗'}
          </span>
        </td>
        <td><span class="test-score" style="color: ${getScoreColor(tc.overallScore)}">${(tc.overallScore * 100).toFixed(0)}%</span></td>
        <td><span class="test-grade ${getGradeColorClass(grade)}">${grade}</span></td>
      </tr>
      ${isExpanded ? renderDetailPanel(tc) : ''}
    `;
  }).join('');
  
  // Update sort indicators
  document.querySelectorAll('.test-table th.sortable').forEach(th => {
    th.classList.remove('sorted');
    if (th.dataset.sort === sortColumn) {
      th.classList.add('sorted');
      th.querySelector('.sort-icon').textContent = sortDirection === 'asc' ? '↑' : '↓';
    } else {
      th.querySelector('.sort-icon').textContent = '↕';
    }
  });
}

// Toggle row expansion
function toggleRow(id) {
  const wasExpanded = expandedRow === id;
  const isExpanding = !wasExpanded;
  
  expandedRow = wasExpanded ? null : id;
  renderTestTable();
  
  // Always scroll to keep the clicked row visible at the top
  // Use requestAnimationFrame to ensure DOM has updated
  requestAnimationFrame(() => {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
      // Get header height to offset scroll position
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Calculate position and scroll
      const rowRect = row.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rowRect.top - headerHeight - 16;
      
      window.scrollTo({
        top: scrollTop,
        behavior: 'instant'  // Instant to avoid fighting with page reflow
      });
    }
  });
}

// Render detail panel for expanded row
function renderDetailPanel(tc) {
  const recommendation = getRecommendation(tc);
  
  return `
    <tr class="detail-panel">
      <td colspan="6">
        <div class="detail-content">
          <!-- Comparison Section -->
          <div class="detail-section">
            <div class="detail-section-header">Expected vs Actual Response</div>
            <div class="detail-section-body">
              <div class="comparison-grid">
                <div class="comparison-column">
                  <div class="comparison-label">Expected Response</div>
                  <div class="comparison-text">${renderMarkdown(tc.expectedResponse)}</div>
                </div>
                <div class="comparison-column">
                  <div class="comparison-label">Actual Response</div>
                  <div class="comparison-text">${renderMarkdown(tc.actualResponse)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Dimensions Section -->
          <div class="detail-section">
            <div class="detail-section-header">Judge Evaluation Scores</div>
            <div class="detail-section-body">
              <div class="dimensions-grid">
                ${renderDimension('Response Alignment', tc.dimensions.responsePromptAlignment)}
                ${renderDimension('Completeness', tc.dimensions.informationCompleteness)}
                ${renderDimension('Clarity', tc.dimensions.responseClarity)}
                ${renderDimension('Tool Usage', tc.dimensions.toolAppropriateness)}
              </div>
            </div>
          </div>
          
          <!-- Findings Section -->
          <div class="detail-section">
            <div class="detail-section-header">Detailed Findings</div>
            <div class="detail-section-body">
              <div class="findings-list">
                ${renderFindings(tc.dimensions)}
              </div>
            </div>
          </div>
          
          <!-- Tool Calls Section -->
          ${tc.toolCalls.length > 0 ? `
          <div class="detail-section">
            <div class="detail-section-header">Tool Calls (${tc.toolCallCount})</div>
            <div class="detail-section-body">
              <div class="tool-calls-list">
                ${tc.toolCalls.map(t => `
                  <div class="tool-call">
                    <span class="tool-call-name">${t.name}</span>
                    <span class="tool-call-status">${t.success ? '✓ Success' : '✗ Failed'}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          ` : ''}
          
          <!-- Meta Info -->
          <div class="detail-section">
            <div class="detail-section-header">Metadata</div>
            <div class="detail-section-body">
              <div class="meta-grid">
                <div class="meta-item">
                  <div class="meta-label">Response Time</div>
                  <div class="meta-value">${(tc.responseTimeMs / 1000).toFixed(2)}s</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Input Tokens</div>
                  <div class="meta-value">${tc.usage.inTokens.toLocaleString()}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Output Tokens</div>
                  <div class="meta-value">${tc.usage.outTokens.toLocaleString()}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Event Mutated</div>
                  <div class="meta-value">${tc.eventMutated ? 'Yes' : 'No'}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Mode</div>
                  <div class="meta-value">${tc.mode}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Expected Artifacts</div>
                  <div class="meta-value">${Array.isArray(tc.expectedArtifacts) ? (tc.expectedArtifacts.length > 0 ? tc.expectedArtifacts.join(', ') : 'None') : tc.expectedArtifacts}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Judge Summary -->
          <div class="detail-section">
            <div class="detail-section-header">Judge Summary</div>
            <div class="detail-section-body">
              <div class="comparison-text">${renderMarkdown(tc.summary)}</div>
            </div>
          </div>
          
          <!-- Style Analysis (NEW) -->
          <div class="detail-section">
            <div class="detail-section-header" style="background: rgba(236, 72, 153, 0.1); color: #ec4899;">Style & Tone Analysis</div>
            <div class="detail-section-body">
              ${renderStyleAnalysis(tc)}
            </div>
          </div>
          
          <!-- My Grading Commentary -->
          <div class="detail-section" style="border: 1px solid rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.05);">
            <div class="detail-section-header" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-blue);">My Grading Commentary</div>
            <div class="detail-section-body">
              ${renderMyGrading(tc)}
            </div>
          </div>
          
          <!-- Recommendations (for failed tests) -->
          ${!tc.passed && recommendation ? `
          <div class="recommendations">
            <div class="recommendations-header">
              <span>💡</span> Improvement Recommendations
            </div>
            ${recommendation.systemPromptFix ? `
            <div class="recommendation-block">
              <div class="recommendation-label">System Prompt Fix</div>
              <div class="recommendation-text">${escapeHtml(recommendation.systemPromptFix)}</div>
            </div>
            ` : ''}
            ${recommendation.contextFix ? `
            <div class="recommendation-block">
              <div class="recommendation-label">Context Engineering Fix</div>
              <div class="recommendation-text">${escapeHtml(recommendation.contextFix)}</div>
            </div>
            ` : ''}
            ${recommendation.specificFix ? `
            <div class="recommendation-block">
              <div class="recommendation-label">Specific Fix for This Test</div>
              <div class="recommendation-text">${escapeHtml(recommendation.specificFix)}</div>
            </div>
            ` : ''}
          </div>
          ` : ''}
        </div>
      </td>
    </tr>
  `;
}

// Render dimension card
function renderDimension(name, dimension) {
  const score = dimension.score;
  const color = getScoreColor(score);
  
  return `
    <div class="dimension-card">
      <div class="dimension-name">${name}</div>
      <div class="dimension-score" style="color: ${color}">${(score * 100).toFixed(0)}%</div>
      <div class="dimension-bar">
        <div class="dimension-bar-fill" style="width: ${score * 100}%; background: ${color};"></div>
      </div>
    </div>
  `;
}

// Render findings
function renderFindings(dimensions) {
  const allFindings = [
    ...dimensions.responsePromptAlignment.findings,
    ...dimensions.informationCompleteness.findings,
    ...dimensions.responseClarity.findings,
    ...dimensions.toolAppropriateness.findings
  ];
  
  if (allFindings.length === 0) {
    return '<div style="color: var(--text-muted)">No detailed findings available</div>';
  }
  
  return allFindings.map(f => {
    const icon = f.status === 'pass' ? '✓' : f.status === 'fail' ? '✗' : '⚠';
    const color = f.status === 'pass' ? 'var(--color-pass)' : f.status === 'fail' ? 'var(--color-fail)' : 'var(--color-warning)';
    
    return `
      <div class="finding-item">
        <div class="finding-status" style="color: ${color}">${icon}</div>
        <div class="finding-content">
          <div class="finding-criterion">${f.criterion}</div>
          <div class="finding-note">${escapeHtml(f.note)}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Sort headers
  document.querySelectorAll('.test-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.dataset.sort;
      if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn = column;
        sortDirection = 'asc';
      }
      renderTestTable();
    });
  });
}

// Toggle section breakdown
function toggleSectionBreakdown() {
  const content = document.getElementById('section-content');
  const toggle = document.getElementById('section-toggle');
  
  content.classList.toggle('collapsed');
  toggle.classList.toggle('collapsed');
}

// Utility functions
function getGrade(score) {
  if (score >= 0.9) return 'A';
  if (score >= 0.75) return 'B';
  if (score >= 0.6) return 'C';
  if (score >= 0.4) return 'D';
  return 'F';
}

function getGradeColorClass(grade) {
  const g = grade.charAt(0).toUpperCase();
  return `grade-${g.toLowerCase()}`;
}

function getScoreColor(score) {
  if (score >= 0.9) return 'var(--color-grade-a)';
  if (score >= 0.75) return 'var(--color-grade-b)';
  if (score >= 0.6) return 'var(--color-grade-c)';
  if (score >= 0.4) return 'var(--color-grade-d)';
  return 'var(--color-grade-f)';
}

function getPassRateColor(rate) {
  if (rate >= 0.8) return 'var(--color-pass)';
  if (rate >= 0.6) return 'var(--color-grade-b)';
  if (rate >= 0.4) return 'var(--color-warning)';
  return 'var(--color-fail)';
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Render Markdown to HTML
function renderMarkdown(text) {
  if (!text) return '';
  try {
    // Configure marked for safe rendering
    marked.setOptions({
      breaks: true,      // Convert \n to <br>
      gfm: true,         // GitHub Flavored Markdown
      sanitize: false    // We trust our data
    });
    return '<div class="md-content">' + marked.parse(text) + '</div>';
  } catch (e) {
    // Fallback to escaped HTML if marked fails
    return escapeHtml(text);
  }
}

// Render my grading commentary for a test case
function renderMyGrading(tc) {
  const grade = getGrade(tc.overallScore);
  const behaviorMatch = getBehaviorMatch(tc);
  const betterResponse = getBetterResponse(tc);
  const commentary = generateCommentary(tc);
  const styleGrade = tc.styleGrade || {};
  
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
      <div style="padding: 0.75rem; background: var(--bg-elevated); border-radius: var(--radius-sm);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">My Grade</div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="test-grade ${getGradeColorClass(grade)}" style="font-size: 1.25rem;">${grade}</span>
          <span style="color: var(--text-secondary); font-size: 0.875rem;">(${(tc.overallScore * 100).toFixed(0)}%)</span>
        </div>
      </div>
      <div style="padding: 0.75rem; background: var(--bg-elevated); border-radius: var(--radius-sm);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Behavior Match</div>
        <div style="color: ${behaviorMatch.color}; font-weight: 500;">${behaviorMatch.label}</div>
      </div>
      <div style="padding: 0.75rem; background: var(--bg-elevated); border-radius: var(--radius-sm);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Better Response?</div>
        <div style="color: ${betterResponse.color}; font-weight: 500;">${betterResponse.label}</div>
      </div>
    </div>
    <div style="padding: 1rem; background: var(--bg-elevated); border-radius: var(--radius-sm);">
      <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Commentary</div>
      <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6;">${commentary}</div>
    </div>
  `;
}

// Render style analysis section for a test case
function renderStyleAnalysis(tc) {
  const styleGrade = tc.styleGrade || {};
  const tone = styleGrade.tone || 3;
  const conciseness = styleGrade.conciseness || 3;
  const helpfulness = styleGrade.helpfulness || 3;
  const styleScore = styleGrade.styleScore || 50;
  const preferred = styleGrade.preferredResponse || 'similar';
  const notes = styleGrade.styleNotes || '';
  
  const preferredLabel = {
    'actual': '✓ Clara is Better',
    'expected': '✗ Expected is Better',
    'similar': '≈ Stylistically Similar'
  };
  
  const preferredClass = {
    'actual': 'actual',
    'expected': 'expected',
    'similar': 'similar'
  };
  
  return `
    <div class="style-grade-section">
      <div class="style-grade-header">
        <span>🎨</span> Style & Tone Analysis
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
        <!-- Tone -->
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Conversational Warmth</span>
            <span style="font-family: var(--font-mono); font-weight: 600; color: ${getToneColor(tone)}">${tone}/5</span>
          </div>
          <div class="style-meter">
            <div class="style-meter-bar">
              <div class="style-meter-fill" style="width: ${tone * 20}%; background: ${getToneColor(tone)};"></div>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${getToneLabel(tone)}</div>
        </div>
        
        <!-- Conciseness -->
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Conciseness</span>
            <span style="font-family: var(--font-mono); font-weight: 600; color: ${getConcisenessColor(conciseness)}">${conciseness}/5</span>
          </div>
          <div class="style-meter">
            <div class="style-meter-bar">
              <div class="style-meter-fill" style="width: ${conciseness * 20}%; background: ${getConcisenessColor(conciseness)};"></div>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${getConcisenessLabel(conciseness)}</div>
        </div>
        
        <!-- Helpfulness -->
        <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Proactive Helpfulness</span>
            <span style="font-family: var(--font-mono); font-weight: 600; color: ${getHelpfulnessColor(helpfulness)}">${helpfulness}/5</span>
          </div>
          <div class="style-meter">
            <div class="style-meter-bar">
              <div class="style-meter-fill" style="width: ${helpfulness * 20}%; background: ${getHelpfulnessColor(helpfulness)};"></div>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${getHelpfulnessLabel(helpfulness)}</div>
        </div>
      </div>
      
      <!-- Overall Style Score & Preferred -->
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-bottom: 1rem;">
        <div style="padding: 0.75rem 1.25rem; background: var(--bg-card); border-radius: var(--radius-sm); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Style Score</div>
          <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: ${getStyleScoreColor(styleScore)}">${styleScore}</div>
        </div>
        <div style="flex: 1;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Preferred Response</div>
          <span class="preferred-badge ${preferredClass[preferred]}">${preferredLabel[preferred]}</span>
        </div>
      </div>
      
      <!-- Style Notes -->
      ${notes ? `
      <div style="padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Style Notes</div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6;">${escapeHtml(notes)}</div>
      </div>
      ` : ''}
    </div>
  `;
}

// Style helper functions
function getToneColor(score) {
  if (score >= 4) return 'var(--color-pass)';
  if (score >= 3) return 'var(--color-grade-b)';
  if (score >= 2) return 'var(--color-warning)';
  return 'var(--color-fail)';
}

function getToneLabel(score) {
  if (score >= 5) return 'Very warm and conversational';
  if (score >= 4) return 'Warm and friendly';
  if (score >= 3) return 'Neutral tone';
  if (score >= 2) return 'Somewhat formal';
  return 'Cold/robotic';
}

function getConcisenessColor(score) {
  if (score >= 4) return 'var(--color-pass)';
  if (score >= 3) return 'var(--color-grade-b)';
  if (score >= 2) return 'var(--color-warning)';
  return 'var(--color-fail)';
}

function getConcisenessLabel(score) {
  if (score >= 5) return 'Perfectly concise';
  if (score >= 4) return 'Appropriately detailed';
  if (score >= 3) return 'Slightly verbose';
  if (score >= 2) return 'Over-explaining';
  return 'Extremely verbose';
}

function getHelpfulnessColor(score) {
  if (score >= 4) return 'var(--color-pass)';
  if (score >= 3) return 'var(--color-grade-b)';
  if (score >= 2) return 'var(--color-warning)';
  return 'var(--color-fail)';
}

function getHelpfulnessLabel(score) {
  if (score >= 5) return 'Excellent proactive assistance';
  if (score >= 4) return 'Good follow-up options';
  if (score >= 3) return 'Some helpful suggestions';
  if (score >= 2) return 'Limited helpfulness';
  return 'No proactive help';
}

function getStyleScoreColor(score) {
  if (score >= 80) return 'var(--color-pass)';
  if (score >= 60) return 'var(--color-grade-b)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-fail)';
}

// Determine if behavior matches expected
function getBehaviorMatch(tc) {
  if (tc.passed && tc.overallScore >= 0.85) {
    return { label: 'Excellent Match', color: 'var(--color-pass)' };
  } else if (tc.passed) {
    return { label: 'Good Match', color: 'var(--color-grade-b)' };
  } else if (tc.overallScore >= 0.6) {
    return { label: 'Partial Match', color: 'var(--color-warning)' };
  } else {
    return { label: 'Poor Match', color: 'var(--color-fail)' };
  }
}

// Determine which response is better
function getBetterResponse(tc) {
  // Analyze based on score and findings
  const hasGoodClarity = tc.dimensions.responseClarity.score >= 0.75;
  const hasGoodCompleteness = tc.dimensions.informationCompleteness.score >= 0.75;
  const hasGoodAlignment = tc.dimensions.responsePromptAlignment.score >= 0.75;
  
  if (tc.passed && tc.overallScore >= 0.9) {
    return { label: 'Actual is Excellent', color: 'var(--color-pass)' };
  } else if (tc.passed && hasGoodClarity && !hasGoodCompleteness) {
    return { label: 'Actual is Clearer', color: 'var(--color-grade-b)' };
  } else if (!tc.passed && hasGoodClarity && hasGoodCompleteness) {
    return { label: 'Close - Minor Issues', color: 'var(--color-warning)' };
  } else if (!tc.passed && tc.overallScore >= 0.5) {
    return { label: 'Expected is Better', color: 'var(--color-warning)' };
  } else {
    return { label: 'Expected is Much Better', color: 'var(--color-fail)' };
  }
}

// Generate commentary based on test case analysis
function generateCommentary(tc) {
  const comments = [];
  
  // Analyze alignment
  if (tc.dimensions.responsePromptAlignment.score >= 0.9) {
    comments.push('The response accurately addresses the user\'s request.');
  } else if (tc.dimensions.responsePromptAlignment.score >= 0.7) {
    comments.push('The response mostly addresses the request but has some gaps.');
  } else if (tc.dimensions.responsePromptAlignment.score >= 0.5) {
    comments.push('The response partially addresses the request but misses key elements.');
  } else {
    comments.push('The response fails to properly address the user\'s request.');
  }
  
  // Analyze completeness
  if (tc.dimensions.informationCompleteness.score < 0.5) {
    comments.push('Missing important information that was expected in the response.');
  }
  
  // Analyze tool usage
  if (tc.eventMutated && !tc.passed) {
    comments.push('Made changes when it should have asked for clarification or confirmation first.');
  } else if (!tc.eventMutated && tc.section.includes('Direct Execution') && !tc.passed) {
    comments.push('Failed to execute the requested change - should have acted directly.');
  }
  
  // Section-specific commentary
  if (tc.section.includes('Vague') && !tc.passed) {
    comments.push('Should have asked clarifying questions instead of taking action on ambiguous input.');
  } else if (tc.section.includes('Propose') && !tc.passed) {
    comments.push('Missing the expected [A]/[B]/[C] confirmation pattern for complex changes.');
  } else if (tc.section.includes('Lookups') && !tc.passed) {
    comments.push('Lookup response contained incorrect or incomplete information.');
  }
  
  // Positive notes
  if (tc.dimensions.responseClarity.score >= 0.9) {
    comments.push('Response is well-structured and easy to understand.');
  }
  
  if (tc.toolCallCount === 0 && tc.section.includes('Chat')) {
    comments.push('Correctly avoided unnecessary tool calls for this chat-mode query.');
  }
  
  return comments.join(' ') || 'No specific issues identified.';
}
