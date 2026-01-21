// Plan Results Logic
document.addEventListener('DOMContentLoaded', function() {
  // Get plan type from URL parameter or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  let planType = urlParams.get('plan') || localStorage.getItem('selectedPlan') || 'beginner';
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userFormData')) || {};
  
  // Display plan based on type
  displayPlan(planType, userData);
  
  // Update user summary
  updateUserSummary(userData);
});

function displayPlan(planType, userData) {
  const planContent = document.getElementById('plan-content');
  const planDescription = document.getElementById('plan-description');
  const planTypeBadge = document.getElementById('plan-type');
  
  // Define all plan templates
  const plans = {
    'beginner': getBeginnerPlan(userData),
    'fat-loss': getFatLossPlan(userData),
    'muscle-gain': getMuscleGainPlan(userData),
    'strength': getStrengthPlan(userData),
    'athletic': getAthleticPlan(userData)
  };
  
  // Get the selected plan
  const plan = plans[planType] || plans['beginner'];
  
  // Update UI
  planDescription.textContent = plan.description;
  planTypeBadge.textContent = plan.type;
  const cleanPlanType = planType.replace(/'/g, '');
  planTypeBadge.className = `plan-type-badge ${cleanPlanType}`;
  
  // Display plan content
  planContent.innerHTML = plan.content;
}

// Helper function to get beginner schedule
function getBeginnerSchedule(daysPerWeek) {
  if (daysPerWeek === 3) {
    return `
      <div class="day-card">
        <h3> Day 1: Full Body A</h3>
        <ul>
          <li>Squats: 3x8-12</li>
          <li>Bench Press: 3x8-12</li>
          <li>Rows: 3x8-12</li>
          <li>Plank: 3x30s</li>
        </ul>
      </div>
      <div class="day-card">
        <h3> Day 2: Rest or Light Cardio</h3>
        <ul>
          <li>Walking: 30 minutes</li>
          <li>Stretching: 15 minutes</li>
        </ul>
      </div>
      <div class="day-card">
        <h3> Day 3: Full Body B</h3>
        <ul>
          <li>Deadlifts: 3x5-8</li>
          <li>Overhead Press: 3x8-12</li>
          <li>Pull-ups: 3xMax</li>
          <li>Leg Raises: 3x12-15</li>
        </ul>
      </div>
    `;
  } else {
    return `
      <div class="day-card">
        <h3> Day 1: Upper Body</h3>
        <ul>
          <li>Bench Press: 3x8-12</li>
          <li>Rows: 3x8-12</li>
          <li>Shoulder Press: 3x10-15</li>
        </ul>
      </div>
      <div class="day-card">
        <h3> Day 2: Lower Body</h3>
        <ul>
          <li>Squats: 3x8-12</li>
          <li>Lunges: 3x10-12 per leg</li>
          <li>Calf Raises: 4x15-20</li>
        </ul>
      </div>
      <div class="day-card">
        <h3> Day 3: Rest or Active Recovery</h3>
        <ul>
          <li>Light cardio</li>
          <li>Mobility work</li>
        </ul>
      </div>
      <div class="day-card">
        <h3> Day 4: Full Body</h3>
        <ul>
          <li>Deadlifts: 3x5-8</li>
          <li>Pull-ups: 3xMax</li>
          <li>Dips: 3x10-15</li>
        </ul>
      </div>
    `;
  }
}

// Helper function to get beginner exercises
function getBeginnerExercises() {
  return `
    <div class="exercise-template">
      <div class="exercise-header">
        <h3 class="exercise-title">Squats</h3>
        <span class="exercise-sets">3 sets × 8-12 reps</span>
      </div>
      <div class="exercise-details">
        <div class="exercise-image">
          <img src="https://www.ironcompany.com/media/mf_webp/jpg/media/magefan_blog/2020/01/Bodybuilder-Tom-Platz-Barbell-Squats.webp" alt="Squats">
        </div>
        <div class="exercise-info">
          <div class="exercise-point">
            <span class="point-label">Focus:</span>
            <span class="point-value">Leg development, overall strength</span>
          </div>
          <div class="exercise-point">
            <span class="point-label">Muscles:</span>
            <span class="point-value">Quads, Hamstrings, Glutes, Core</span>
          </div>
          <div class="exercise-point">
            <span class="point-label">Tip:</span>
            <span class="point-value">Keep chest up, go parallel or below</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="exercise-template">
      <div class="exercise-header">
        <h3 class="exercise-title">Bench Press</h3>
        <span class="exercise-sets">3 sets × 8-12 reps</span>
      </div>
      <div class="exercise-details">
        <div class="exercise-image">
          <img src="https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/05/levrone-barbell-bench-press.jpg?quality=86&strip=all" alt="Bench Press">
        </div>
        <div class="exercise-info">
          <div class="exercise-point">
            <span class="point-label">Focus:</span>
            <span class="point-value">Upper body strength</span>
          </div>
          <div class="exercise-point">
            <span class="point-label">Muscles:</span>
            <span class="point-value">Chest, Triceps, Shoulders</span>
          </div>
          <div class="exercise-point">
            <span class="point-label">Tip:</span>
            <span class="point-value">Keep shoulder blades retracted</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getBeginnerPlan(userData) {
  const daysPerWeek = userData.timeframe === '3days' ? 3 : 4;
  
  return {
    type: 'Beginner Foundation',
    description: 'A perfect starting point for your fitness journey. Focus on learning proper form and building a solid foundation.',
    content: `
      <div class="plan-section">
        <h2> Weekly Schedule (${daysPerWeek} Days/Week)</h2>
        <div class="week-schedule">
          ${getBeginnerSchedule(daysPerWeek)}
        </div>
      </div>
      
      <div class="plan-section">
        <h2> Key Principles</h2>
        <div class="principles">
          <div class="principle">
            <h3>Form First</h3>
            <p>Focus on proper technique before adding weight</p>
          </div>
          <div class="principle">
            <h3>Consistency</h3>
            <p>Stick to the schedule for at least 8 weeks</p>
          </div>
          <div class="principle">
            <h3>Progressive Overload</h3>
            <p>Gradually increase weights each week</p>
          </div>
        </div>
      </div>
      
      <div class="plan-section">
        <h2> Exercise Library</h2>
        ${getBeginnerExercises()}
      </div>
    `
  };
}

// Helper function for fat loss workouts
function getFatLossWorkouts() {
  return `
    <div class="workout-session hiit">
      <h3> HIIT Circuit (30 minutes)</h3>
      <div class="session-details">
        <div class="detail-item">
          <span class="detail-label">Work:</span>
          <span class="detail-value">40 seconds</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Rest:</span>
          <span class="detail-value">20 seconds</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Rounds:</span>
          <span class="detail-value">5-6</span>
        </div>
      </div>
      
      <h4>Circuit Exercises:</h4>
      <ul>
        <li>Burpees</li>
        <li>Mountain Climbers</li>
        <li>Jump Squats</li>
        <li>Push-ups</li>
        <li>Plank to Push-up</li>
      </ul>
      
      <h4>Nutrition Tip:</h4>
      <p>Maintain a calorie deficit of 300-500 calories daily for steady fat loss.</p>
    </div>
    
    <div class="workout-session cardio">
      <h3> Steady State Cardio (45 minutes)</h3>
      <p>Choose one activity and maintain moderate intensity:</p>
      <ul>
        <li>Treadmill incline walking</li>
        <li>Stationary bike</li>
        <li>Elliptical trainer</li>
        <li>Swimming</li>
      </ul>
      <p><strong>Intensity:</strong> 60-70% of max heart rate</p>
    </div>
  `;
}

function getFatLossPlan(userData) {
  return {
    type: 'Fat Loss & Toning',
    description: 'High-intensity workouts combined with proper nutrition for maximum fat burning.',
    content: `
      <div class="plan-section">
        <h2> HIIT Workouts</h2>
        <div class="hiit-workouts">
          ${getFatLossWorkouts()}
        </div>
      </div>
      
      <div class="plan-section">
        <h2> Nutrition Guidelines</h2>
        <div class="principles">
          <div class="principle">
            <h3>Calorie Deficit</h3>
            <p>Aim for 300-500 calorie deficit daily</p>
          </div>
          <div class="principle">
            <h3>Protein Intake</h3>
            <p>1.6-2.2g per kg of body weight</p>
          </div>
          <div class="principle">
            <h3>Hydration</h3>
            <p>3-4 liters of water daily</p>
          </div>
        </div>
      </div>
      
      <div class="plan-section">
        <h2> Weekly Schedule</h2>
        <div class="week-schedule">
          <div class="day-card">
            <h3> Monday: HIIT + Strength</h3>
            <ul>
              <li>HIIT Circuit: 30 min</li>
              <li>Compound lifts: 45 min</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Tuesday: Cardio</h3>
            <ul>
              <li>Steady state cardio: 45 min</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Wednesday: HIIT</h3>
            <ul>
              <li>HIIT Circuit: 30 min</li>
              <li>Core work: 15 min</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Thursday: Active Recovery</h3>
            <ul>
              <li>Walking: 30 min</li>
              <li>Stretching: 20 min</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
}

// Helper function for muscle gain workouts
function getMuscleGainWorkouts() {
  return `
    <div class="plan-section">
      <h2> Bizeps</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Bizeps Curls</h3>
          <span class="exercise-sets">2-3 sets × 6-12 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-image">
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop" alt="Incline Bench Press">
          </div>
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Bizeps peak development</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">90-120 seconds</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Progression:</span>
              <span class="point-value">Add 2.5kg weekly</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="plan-section">
      <h2> Trizeps</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Trizeps Pushdown</h3>
          <span class="exercise-sets">2-3 sets × 6-12 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYCiIW2pfp9MiS293l_2kXGaZk7hKRsLIGA&s" alt="Incline Bench Press">
          </div>
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Trizeps development</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">90-120 seconds</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Progression:</span>
              <span class="point-value">Add 1.5kg weekly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getMuscleGainPlan(userData) {
  return {
    type: 'Muscle Building',
    description: 'Hypertrophy-focused training for maximum muscle growth and size.',
    content: `
      <div class="plan-section">
        <h2> Hypertrophy Principles</h2>
        <div class="principles">
          <div class="principle">
            <h3>Volume</h3>
            <p>10-20 sets per muscle group weekly</p>
          </div>
          <div class="principle">
            <h3>Intensity</h3>
            <p>70-80% of 1RM for hypertrophy</p>
          </div>
          <div class="principle">
            <h3>Frequency</h3>
            <p>Train each muscle 2x per week</p>
          </div>
        </div>
      </div>
      
      <div class="plan-section">
        <h2> Nutrition for Growth</h2>
        <div class="principles">
          <div class="principle">
            <h3>Calorie Surplus</h3>
            <p>300-500 calorie surplus daily</p>
          </div>
          <div class="principle">
            <h3>Protein</h3>
            <p>2.2-2.5g per kg of body weight</p>
          </div>
          <div class="principle">
            <h3>Carbs</h3>
            <p>4-6g per kg for energy</p>
          </div>
        </div>
      </div>
      
      ${getMuscleGainWorkouts()}
    `
  };
}

// Helper function for strength workouts
function getStrengthWorkouts() {
  return `
    <div class="plan-section">
      <h2> Powerlifting Focus</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Squats (Heavy)</h3>
          <span class="exercise-sets">5 sets × 3-5 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Intensity:</span>
              <span class="point-value">85-90% of 1RM</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">3-5 minutes</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Explosive power from bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>

       <div class="plan-section">
      <h2> Powerlifting Focus</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Benchpress (Heavy)</h3>
          <span class="exercise-sets">5 sets × 3-5 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Intensity:</span>
              <span class="point-value">90-100% of 1RM</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">3-5 minutes</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Explosive power from bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>

       <div class="plan-section">
      <h2> Powerlifting Focus</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Deadlift (Heavy)</h3>
          <span class="exercise-sets">5 sets × 3-5 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Intensity:</span>
              <span class="point-value">85-90% of 1RM</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">3-5 minutes</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Explosive power from bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>

       <div class="plan-section">
      <h2> Powerlifting Focus</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Bizeps Curls (Heavy)</h3>
          <span class="exercise-sets">5 sets × 3-5 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Intensity:</span>
              <span class="point-value">85-90% of 1RM</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">3-5 minutes</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Explosive power from bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getStrengthPlan(userData) {
  return {
    type: 'Strength & Power',
    description: 'Focus on compound movements and progressive overload for maximum strength gains.',
    content: `
      <div class="plan-section">
        <h2> Strength Training Principles</h2>
        <div class="principles">
          <div class="principle">
            <h3>Low Reps</h3>
            <p>3-5 reps for maximal strength</p>
          </div>
          <div class="principle">
            <h3>Long Rest</h3>
            <p>3-5 minutes between heavy sets</p>
          </div>
          <div class="principle">
            <h3>Progressive Overload</h3>
            <p>Increase weight weekly</p>
          </div>
        </div>
      </div>
      
      <div class="plan-section">
        <h2> 12-Week Progression</h2>
        <div class="principles">
          <div class="principle">
            <h3>Weeks 1-4</h3>
            <p>Technique focus, 75% intensity</p>
          </div>
          <div class="principle">
            <h3>Weeks 5-8</h3>
            <p>Build volume, 80-85% intensity</p>
          </div>
          <div class="principle">
            <h3>Weeks 9-12</h3>
            <p>Peak intensity, 85-90% intensity</p>
          </div>
        </div>
      </div>
      
      ${getStrengthWorkouts()}
    `
  };
}

// Helper function for athletic workouts
function getAthleticWorkouts() {
  return `
    <div class="plan-section">
      <h2>Plyometric Training</h2>
      <div class="exercise-template">
        <div class="exercise-header">
          <h3 class="exercise-title">Box Jumps</h3>
          <span class="exercise-sets">4 sets × 6-8 reps</span>
        </div>
        <div class="exercise-details">
          <div class="exercise-image">
            <img src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&auto=format&fit=crop" alt="Box Jumps">
          </div>
          <div class="exercise-info">
            <div class="exercise-point">
              <span class="point-label">Focus:</span>
              <span class="point-value">Explosive power</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Rest:</span>
              <span class="point-value">60-90 seconds</span>
            </div>
            <div class="exercise-point">
              <span class="point-label">Safety:</span>
              <span class="point-value">Start low, progress gradually</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getAthleticPlan(userData) {
  return {
    type: 'Athletic Performance',
    description: 'Functional training for improved athletic performance and overall fitness.',
    content: `
      <div class="plan-section">
        <h2> Weekly Split</h2>
        <div class="week-schedule">
          <div class="day-card">
            <h3> Monday: Power & Speed</h3>
            <ul>
              <li>Plyometrics</li>
              <li>Sprint training</li>
              <li>Olympic lifts</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Tuesday: Strength</h3>
            <ul>
              <li>Compound lifts</li>
              <li>Core stability</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Wednesday: Conditioning</h3>
            <ul>
              <li>HIIT circuits</li>
              <li>Endurance work</li>
            </ul>
          </div>
          <div class="day-card">
            <h3> Thursday: Skill & Mobility</h3>
            <ul>
              <li>Sport-specific skills</li>
              <li>Mobility drills</li>
            </ul>
          </div>
        </div>
      </div>
      
      ${getAthleticWorkouts()}
      
      <div class="plan-section">
        <h2> Performance Metrics</h2>
        <div class="principles">
          <div class="principle">
            <h3>Vertical Jump</h3>
            <p>Measure progress every 4 weeks</p>
          </div>
          <div class="principle">
            <h3>40-yard Dash</h3>
            <p>Track speed improvements</p>
          </div>
          <div class="principle">
            <h3>Agility</h3>
            <p>Improve change of direction</p>
          </div>
        </div>
      </div>
    `
  };
}

function updateUserSummary(userData) {
  const summaryContainer = document.getElementById('user-summary');
  
  const summaryHTML = `
    <div class="summary-grid">
      <div class="summary-item">
        <span class="summary-label">Experience:</span>
        <span class="summary-value">${getDisplayValue(userData.experience, 'experience')}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Goal:</span>
        <span class="summary-value">${getDisplayValue(userData.goal, 'goal')}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Schedule:</span>
        <span class="summary-value">${getDisplayValue(userData.timeframe, 'timeframe')}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Style:</span>
        <span class="summary-value">${getDisplayValue(userData.style, 'style')}</span>
      </div>
    </div>
  `;
  
  summaryContainer.innerHTML = summaryHTML;
}

function getDisplayValue(value, type) {
  const maps = {
    experience: {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    },
    goal: {
      'fat-loss': 'Fat Loss',
      'muscle-gain': 'Muscle Gain',
      'strength': 'Strength',
      'athletic': 'Athletic'
    },
    timeframe: {
      '3days': '3 Days/Week',
      '4days': '4 Days/Week',
      '5days': '5 Days/Week',
      '6days': '6 Days/Week'
    },
    style: {
      'classic': 'Classic Bodybuilding',
      'power': 'Powerlifting',
      'functional': 'Functional',
      'hiit': 'HIIT'
    }
  };
  
  return maps[type]?.[value] || value || 'Not specified';
}

function savePlan() {
  const planContent = document.getElementById('plan-content').innerHTML;
  const planName = document.getElementById('plan-type').textContent;
  
  // Create a blob and download link
  const blob = new Blob([`
    <html>
    <head>
      <title>${planName} - GymBros</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .plan-section { margin-bottom: 30px; }
        h1, h2 { color: #ff7b00; }
        .exercise-template { border: 1px solid #ddd; padding: 15px; margin: 15px 0; }
        .exercise-header { display: flex; justify-content: space-between; }
      </style>
    </head>
    <body>
      <h1>${planName}</h1>
      <p>Generated by GymBros on ${new Date().toLocaleDateString()}</p>
      <hr>
      ${planContent}
    </body>
    </html>
  `], { type: 'text/html' });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gymbros-plan-${planName.toLowerCase().replace(/\s+/g, '-')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('Plan saved successfully!');
}