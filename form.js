// Form Wizard Functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('planForm');
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  let currentStep = 0;

  // Update progress steps
  function updateProgress() {
    progressSteps.forEach((step, index) => {
      if (index <= currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  // Show current step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
    });
    currentStep = stepIndex;
    updateProgress();
  }

  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStepElement = steps[currentStep];
      const inputs = currentStepElement.querySelectorAll('select[required], input[required]');
      let isValid = true;

      // Validate current step
      inputs.forEach(input => {
        if (!input.value) {
          isValid = false;
          input.style.borderColor = '#ff4444';
        } else {
          input.style.borderColor = '';
        }
      });

      // Check for radio buttons
      const radios = currentStepElement.querySelectorAll('input[type="radio"]');
      if (radios.length > 0) {
        const radioChecked = Array.from(radios).some(radio => radio.checked);
        if (!radioChecked) {
          isValid = false;
          document.querySelector('.radio-group').style.color = '#ff4444';
        } else {
          document.querySelector('.radio-group').style.color = '';
        }
      }

      if (isValid && currentStep < steps.length - 1) {
        // Update review summary before moving to last step
        if (currentStep === steps.length - 2) {
          updateReviewSummary();
        }
        showStep(currentStep + 1);
      }
    });
  });

  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Update review summary
  function updateReviewSummary() {
    const experience = document.getElementById('experience').value;
    const goal = document.getElementById('goal').value;
    const timeframe = document.getElementById('timeframe').value;
    const style = document.querySelector('input[name="style"]:checked');
    const equipment = document.querySelectorAll('input[name="equipment"]:checked');

    // Map values to display text
    const experienceMap = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };

    const goalMap = {
      'fat-loss': 'Lose Fat & Tone',
      'muscle-gain': 'Build Muscle Mass',
      'strength': 'Gain Strength',
      'athletic': 'Become Athletic'
    };

    const timeframeMap = {
      '3days': '3 days per week',
      '4days': '4 days per week',
      '5days': '5 days per week',
      '6days': '6 days per week'
    };

    const styleMap = {
      'classic': 'Classic Bodybuilding',
      'power': 'Powerlifting Focus',
      'functional': 'Functional Fitness',
      'hiit': 'HIIT & Cardio'
    };

    const equipmentMap = {
      'gym': 'Full Gym',
      'home': 'Home Equipment',
      'bodyweight': 'Bodyweight Only'
    };

    // Update review fields
    document.getElementById('review-experience').textContent = 
      experienceMap[experience] || '-';

    document.getElementById('review-goal').textContent = 
      goalMap[goal] || '-';

    document.getElementById('review-timeframe').textContent = 
      timeframeMap[timeframe] || '-';

    document.getElementById('review-style').textContent = 
      style ? styleMap[style.value] : '-';

    const equipmentValues = Array.from(equipment).map(e => equipmentMap[e.value]);
    document.getElementById('review-equipment').textContent = 
      equipmentValues.length > 0 ? equipmentValues.join(', ') : '-';
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect all form data
    const formData = {
      experience: document.getElementById('experience').value,
      goal: document.getElementById('goal').value,
      timeframe: document.getElementById('timeframe').value,
      equipment: Array.from(document.querySelectorAll('input[name="equipment"]:checked')).map(e => e.value),
      style: document.querySelector('input[name="style"]:checked')?.value,
      height: document.getElementById('height').value,
      weight: document.getElementById('weight').value,
      diet: document.getElementById('diet').value,
      injuries: document.getElementById('injuries').value
    };

    // Determine which plan to show based on form data
    let planType = determinePlanType(formData);
    
    // Save form data to localStorage or sessionStorage
    localStorage.setItem('userFormData', JSON.stringify(formData));
    localStorage.setItem('selectedPlan', planType);
    
    // Redirect to plan page with query parameter
    window.location.href = `plan-result.html?plan=${planType}`;
  });

  // Determine plan type based on form data
  function determinePlanType(data) {
    // Logic to determine which plan to show
    if (data.experience === 'beginner') {
      return 'beginner';
    } else if (data.goal === 'fat-loss') {
      return 'fat-loss';
    } else if (data.goal === 'muscle-gain') {
      return 'muscle-gain';
    } else if (data.goal === 'strength') {
      return 'strength';
    } else {
      return 'athletic'; // default plan
    }
  }

  // Initialize first step
  showStep(0);
});