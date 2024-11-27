export const guardrailData = {
  design: {
    title: 'Design',
    color: '#4299E1',
    guardrails: [
      {
        name: 'Identifying Affected Stakeholders',
        riskLevel: 'High',
        risks: [
          'Incomplete stakeholder identification leading to unmet needs',
          'Lack of inclusivity causing biased outcomes',
          'Neglecting environmental and ecological stakeholders leading to unsustainable practices'
        ],
        controls: [
          'Stakeholder Mapping: Use RACI matrices or stakeholder analysis tools to identify relevant parties, including environmental and ecological considerations',
          'Establish a stakeholder Engagement Committee: Form a Committee responsible for ongoing Engagement with diverse stakeholder groups, including marginalised communities and environmental organisations',
          'Develop Inclusive Engagement Policies: Create Policies that mandate the inclusion of all relevant stakeholders in the design process'
        ],
        principles: [
          'Fairness and Non-discrimination',
          'Inclusivity',
          'Social and Environmental Benefit',
          'Stakeholder Impact Assessment'
        ]
      },
      {
        name: 'Measures of Intended Outcome',
        riskLevel: 'Medium',
        risks: [
          'Lack of systematic benefit tracking leading to unmeasured return on investment',
          'Inadequate alignment with strategic goals resulting in failure to realise expected business outcomes',
          'Poor communication of AI benefits reducing stakeholder confidence and support'
        ],
        controls: [
          'Benefit realisation framework: Implement a structured benefits management framework that clearly defines expected outcomes. Specify intended outcomes and key performance indicators, and timelines to track the achievement of AI project/program objectives.',
          'Alignment with Goals: Ensure measures reflect organisational objectives and societal values',
          'Benefit ownership: Assign clear responsibility to a dedicated individual or team for monitoring and reporting on the realisation of AI benefits.'
        ],
        principles: [
          'Accountability',
          'Measurable Benefits',
          'Transparency',
          'Effectiveness'
        ]
      },
      {
        name: 'User Experience',
        riskLevel: 'Medium',
        risks: [
          'Poor usability hindering adoption and may lead to AI solutions that fail to meet business requirements or introduce inefficiencies',
          'Accessibility issues excluding users with disabilities'
        ],
        controls: [
          'User-Centred Design: Apply principles that focus on user needs and usability',
          'Compliance with assessibility standards: Ensure systems meet accessibility standards to cater to users with disabilities. For example, compliance with WCAG 2.2'
        ],
        principles: [
          'Accessibility',
          'Human-Centered Design',
          'Usability',
          'Universal Design'
        ]
      },
      {
        name: 'Ethics Assessment',
        riskLevel: 'High',
        risks: [
          'Ethical oversights leading to public distrust',
          'Violation of ethical principles resulting in legal repercussions'
        ],
        controls: [
          'Ethical Impact Assessment: Conduct comprehensive assessments to identify potential ethical issues. Potentially have this covered by the Commonwealth AI Assurance Framework',
          'Commonwealth AI Assurance Framework: Use the framework for continuous ethical review and guidance which includes departmental legal team\'s review'
        ],
        principles: [
          'Ethical AI',
          'Responsible Innovation',
          'Trust and Transparency',
          'Public Interest'
        ]
      },
      {
        name: 'Aim/Context and Use Definition',
        riskLevel: 'Medium',
        risks: [
          'Misalignment with Objectives: Unclear aims can lead to ineffective AI solutions',
          'Inappropriate Use Cases: AI applications may not be suitable for certain contexts, leading to negative outcomes'
        ],
        controls: [
          'Define Clear Objectives: Use project management approaches such as PRINCE2 to set specific, measurable project management processes',
          'Use Case Evaluation: Validate AI applications against organisational mission and ethical guidelines to ensure suitability'
        ],
        principles: [
          'Purpose Alignment',
          'Contextual Appropriateness',
          'Clear Objectives',
          'Proportionality'
        ]
      }
    ]
  },
  test: {
    title: 'Test',
    color: '#9F7AEA',
    guardrails: [
      {
        name: 'Usability Testing and Stakeholder Engagement',
        riskLevel: 'Medium',
        risks: [
          'Unidentified usability issues may hinder adoption',
          'Resistance to change among staff'
        ],
        controls: [
          'Beta Testing: Involve end-users in early testing phases to gather detailed feedback on usability and performance',
          'User Feedback Loops: Establish continuous feedback mechanisms (e.g., surveys, focus groups) for users to report issues and provide suggestions for improvement',
          'Change Management Support: Provide training and resources to ease the transition and manage resistance to change among staff'
        ],
        principles: [
          'Human-centred values',
          'Transparency and explainability'
        ]
      },
      {
        name: 'Performance Against Intended Impact',
        riskLevel: 'High',
        risks: [
          'Ineffectiveness in delivering intended outcomes',
          'Negative impacts inadvertently caused'
        ],
        controls: [
          'Impact Assessments: Evaluate whether the AI system meets its intended goals using tools like Logic Models',
          'Performance Dashboards: Monitor key metrics in real-time to identify and address issues swiftly'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      },
      {
        name: 'Measuring Effectiveness and Unintended Consequences',
        riskLevel: 'High',
        risks: [
          'Failure to achieve intended outcomes or unintended negative consequences due to inaccurate performance evaluation'
        ],
        controls: [
          'Impact Evaluation: Conduct thorough evaluations using tools like Logic Models to measure whether the AI system achieves its intended impact',
          'Performance Dashboards: Implement dashboards to continuously monitor key metrics, allowing for early identification and remediation of performance issues'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      },
      {
        name: 'Test-Driven Development',
        riskLevel: 'Medium',
        risks: [
          'Delayed issue detection increasing costs',
          'Incomplete testing overlooking critical areas'
        ],
        controls: [
          'Comprehensive Test Planning: Develop detailed test cases before and during development to ensure thorough coverage of functionality and edge cases',
          'Continuous Integration Testing: Integrate automated and manual testing throughout the development lifecycle to catch issues early and ensure high code quality at every stage'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      }
    ]
  },
  deploy: {
    title: 'Deploy',
    color: '#38B2AC',
    guardrails: [
      {
        name: 'MLOps/LLMOps Practices',
        riskLevel: 'Medium',
        risks: [
          'Deployment errors may disrupt services',
          'Inconsistent environments can lead to operational inefficiencies'
        ],
        controls: [
          'MLOps Pipelines: Automate deployment processes to minimise human error and ensure smooth, repeatable deployments',
          'Environment Consistency: Use containerisation tools (e.g., Docker) to maintain consistency across development, testing, and production environments'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      },
      {
        name: 'Rollouts',
        riskLevel: 'Medium',
        risks: [
          'Uncontrolled deployment may overwhelm users, resulting in resistance, errors, or misconfigurations'
        ],
        controls: [
          'Phased Rollouts: Implement the AI solution in a gradual, controlled manner to manage user adaptation, identify potential issues early, and minimise disruption'
        ],
        principles: [
          'Reliability and safety',
          'Human-centred values'
        ]
      },
      {
        name: 'Staging',
        riskLevel: 'Medium',
        risks: [
          'Insufficient testing before deployment could lead to unforeseen issues in production environments'
        ],
        controls: [
          'Staging Environments: Use environments that replicate production settings to conduct thorough testing and validation before final deployment to ensure system stability'
        ],
        principles: [
          'Reliability and safety'
        ]
      },
      {
        name: 'Post-deployment Monitoring',
        riskLevel: 'High',
        risks: [
          'Lack of ongoing monitoring may lead to undetected issues, performance degradation, or risks to data privacy and security'
        ],
        controls: [
          'Real-Time Monitoring: Implement continuous monitoring for performance, reliability, and security issues',
          'User Feedback Loops: Ensure a system for capturing user input'
        ],
        principles: [
          'Reliability and safety',
          'Privacy protection and security'
        ]
      },
      {
        name: 'User Adaptation',
        riskLevel: 'Medium',
        risks: [
          'Users may lack understanding of AI tools, leading to improper use or mistrust'
        ],
        controls: [
          'Training Programmes: Provide comprehensive user training, including ethical use and limitations of AI',
          'User Manuals: Develop clear documentation for end-users'
        ],
        principles: [
          'Human-centred values',
          'Transparency and explainability'
        ]
      }
    ]
  },
  training: {
    title: 'Training',
    color: '#ED8936',
    guardrails: [
      {
        name: 'Training Methodology and Human-in-the-Loop',
        riskLevel: 'Medium',
        risks: [
          'Automation errors without human oversight',
          'Inefficient processes may also increase costs'
        ],
        controls: [
          'Human Oversight: Implement checkpoints where humans review AI outputs to catch errors and make adjustments',
          'Staged Development: Use iterative development processes for flexibility with human-in-the-loop checks'
        ],
        principles: [
          'Reliability and safety',
          'Contestability'
        ]
      },
      {
        name: 'Bias Detection During Training',
        riskLevel: 'High',
        risks: [
          'Model bias causing discriminatory decisions',
          'Unfair outcomes affecting certain groups'
        ],
        controls: [
          'Fairness Metrics: Apply statistical measures like disparate impact ratio',
          'Regular Monitoring: Continuously assess models during training for bias and adjust as necessary'
        ],
        principles: [
          'Fairness',
          'Human-centred values'
        ]
      },
      {
        name: 'Techniques and Learning Types',
        riskLevel: 'Medium',
        risks: [
          'Misapplied algorithms not solving the problem',
          'Overfitting or underfitting causing poor generalisation'
        ],
        controls: [
          'Algorithm Selection: Choose algorithms based on data characteristics and problem requirements',
          'Cross-Validation: Use methods like k-fold cross-validation to assess model performance and prevent overfitting'
        ],
        principles: [
          'Reliability and safety',
          'Transparency and explainability'
        ]
      },
      {
        name: 'Cost and Compute Resources',
        riskLevel: 'Medium',
        risks: [
          'Budget overruns exceeding allocated funds',
          'Environmental impact from high compute resource consumption'
        ],
        controls: [
          'Resource Optimisation: Use efficient algorithms and hardware to reduce computational load',
          'Cost Monitoring: Track compute costs in real-time to stay within budget',
          'Green Computing Practices: Implement energy-efficient computing to minimise environmental impact'
        ],
        principles: [
          'Human, social and environmental wellbeing',
          'Reliability and safety'
        ]
      },
      {
        name: 'Specialist Knowledge and Reinforcement Learning',
        riskLevel: 'Medium',
        risks: [
          'Complexity requiring specialised expertise',
          'Unpredictable behaviour from reinforcement learning agents'
        ],
        controls: [
          'Expert Involvement: Include AI specialists and domain experts in the development team',
          'Safety Constraints: Set operational boundaries and fail-safes within the AI system to prevent undesirable behaviour'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      }
    ]
  },
  data: {
    title: 'Data',
    color: '#48BB78',
    guardrails: [
      {
        name: 'Bias Detection and Mitigation',
        riskLevel: 'High',
        risks: [
          'Biased datasets causing unfair outcomes',
          'Reinforcement of existing biases in data'
        ],
        controls: [
          'Bias Audits: Analyse data for biases using statistical methods',
          'Diverse Collection: Ensure datasets are representative of diverse groups and demographics, promoting fairness and reducing the risk of discrimination',
          'Fairness Techniques: Apply debiasing methods like re-sampling or adversarial debiasing',
          'Bias Mitigation Techniques: Implement appropriate methods to address and reduce bias, such as re-sampling, data augmentation, or other fairness-enhancing approaches tailored to the specific context of the AI system'
        ],
        principles: [
          'Fairness',
          'Human-centred values'
        ]
      },
      {
        name: 'Data Orchestration and Management',
        riskLevel: 'Medium',
        risks: [
          'Inconsistent data handling causing integrity issues',
          'Data silos impeding comprehensive analysis'
        ],
        controls: [
          'Data Governance: Develop and implement policies and procedures to ensure the proper management, quality, security, and compliance of data throughout its lifecycle. These policies should align with recognised best practices and industry standards to promote accountability and consistency in data handling. For example, establish policies based on standards like ISO/IEC 38505',
          'Unified Platforms: Use centralised repositories with controlled access to facilitate collaboration and data consistency'
        ],
        principles: [
          'Reliability and safety',
          'Accountability'
        ]
      },
      {
        name: 'Indigenous Data Considerations',
        riskLevel: 'High',
        risks: [
          'Cultural insensitivity harming communities',
          'Violation of rights breaching legal protections'
        ],
        controls: [
          'Engage with Indigenous Communities: Follow the AIATSIS Code of Ethics for respectful engagement',
          'CARE Principles: Adhere to principles for indigenous data governance, focusing on Collective benefit, Authority to control, Responsibility, and Ethics'
        ],
        principles: [
          'Human-centred values',
          'Fairness'
        ]
      },
      {
        name: 'Data Categorisation and Pre-trained Models',
        riskLevel: 'Medium',
        risks: [
          'AI solution results may be inaccurate due to model deficiencies or incorrect logic, leading to poor or incorrect outcomes',
          'Misclassification impairing accuracy',
          'Incompatibility with pre-trained models leading to poor performance'
        ],
        controls: [
          'Accurate Labelling: Use standardised taxonomies and labelling protocols',
          'Model Evaluation: Assess pre-trained models for suitability and adapt them to align with organisational data',
          'Controls monitor data quality over time (e.g. to detect \'data drift\'), ensuring that learning models are continuously refined based on changing data patterns. Consideration is given to data volume and its impact on learning quality'
        ],
        principles: [
          'Reliability and safety',
          'Transparency and explainability'
        ]
      },
      {
        name: 'Data Supply Chain, Lineage, and Metadata',
        riskLevel: 'Medium',
        risks: [
          'Traceability gaps hampering accountability',
          'Metadata mismanagement leading to misuse'
        ],
        controls: [
          'Data Lineage Tools: Implement systems to track data origins and transformations',
          'Metadata Standards: Adopt standards like Dublin Core or ISO 23081 for metadata management'
        ],
        principles: [
          'Transparency and explainability',
          'Accountability'
        ]
      }
    ]
  }
  // Add other stages as needed
};
