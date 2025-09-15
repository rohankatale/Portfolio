import { CareerEvent, Project, Service } from '../types';

export const careerEvents: CareerEvent[] = [
	{
		title: 'Started B.Tech at IIIT Pune',
		description: 'Began Computer Science & Engineering journey at prestigious IIIT Pune, building strong foundations in programming and CS fundamentals.',
		icon: 'code',
		company: 'IIIT Pune',
		location: 'Pune, India',
	},
	{
		title: 'Cybersecurity Expertise Development',
		description: 'Achieved Top 7% on TryHackMe platform (Level 8) and earned Google Cybersecurity Professional Certificate, focusing on threat detection and security.',
		icon: 'shield',
		company: 'Self Learning',
		location: 'Remote',
	},
	{
		title: 'Advanced Project Development',
		description: 'Built microservices architecture, cloud-based ML systems, and secured 5th place in Devstorm BITS Goa Hackathon.',
		icon: 'server',
		company: 'Academic & Competitions',
		location: 'India',
	},
	{
		title: 'Specialization & Career Preparation',
		description: 'Focusing on cybersecurity, cloud technologies, and advanced software engineering practices. Preparing for final year and career transition.',
		icon: 'star',
		company: 'IIIT Pune',
		location: 'Pune, India',
	},
	{
		title: 'Graduation & Career Launch',
		description: 'Completing B.Tech degree and transitioning into cybersecurity or software engineering roles with strong technical foundation.',
		icon: 'graduation',
		company: 'Industry',
		location: 'India',
	},
];

export const projects: Project[] = [
	{
		id: 'microservices-quiz',
		title: 'Microservices Quiz Application',
		description:
			'Scalable microservices quiz app using Spring Boot and Spring Cloud with Eureka, Gateway, and OpenFeign. Features distinct services for Questions, Quizzes, API Gateway, and Service Registry with PostgreSQL integration.',
		image: '/images/projects/QuizImage1.png',
		images: ['/images/projects/QuizImage1.png', '/images/projects/QuizImage2.png', '/images/projects/QuizImage3.png'],
		type: 'desktop',
		technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'PostgreSQL', 'Maven', 'Eureka', 'JUnit'],
		liveUrl: 'https://microservices-quiz-demo.herokuapp.com',
		githubUrl: 'https://github.com/rohankatale/Microservices-BasedQuizApplication',
	},
	{
		id: 'event-booking-api',
		title: 'Event Booking System',
		description:
			'A comprehensive backend application powering an event management platform built with Java and Spring Boot. Features a three-tier architecture with Controller, Service, and Repository layers. Users can register, authenticate, create events, and manage bookings with JWT authentication and SQLite persistence. Includes user profiles, event discovery, booking management, and real-time event listings with search and filter capabilities.',
		image: '/images/projects/event1.png',
		images: ['/images/projects/event1.png', '/images/projects/event2.png', '/images/projects/event3.png'],
		type: 'desktop',
		technologies: ['Golang', 'Gin', 'SQLite', 'JWT', 'bcrypt', 'REST API'],
		liveUrl: 'https://event-booking-api-demo.herokuapp.com',
		githubUrl: 'https://github.com/rohankatale/Event_Booking',
	},
	{
		id: 'cloud-threat-detection',
		title: 'Cloud Threat Detection using ML',
		description:
			'Real-time Intrusion Detection System for AWS using Python, TensorFlow, and ANN for threat classification. Achieved 98.24% accuracy with automated SMTP alerts for critical threats.',
		image: '/images/projects/IIds1.png',
		images: ['/images/projects/IIds1.png', '/images/projects/Iids2.png', '/images/projects/Iids3.png'],
		type: 'desktop',
		technologies: ['Python', 'TensorFlow', 'Keras', 'AWS EC2', 'Machine Learning', 'Cybersecurity'],
		liveUrl: '',
		githubUrl: 'https://github.com/rohankatale/CloudThreatDetectionUsingML',
	},
	
];

export const skills = [
	{
		category: 'Languages',
		technologies: [
			{ name: 'Java', icon: 'java', level: 90 },
			{ name: 'Python', icon: 'python', level: 85 },
			{ name: 'Golang', icon: 'go', level: 80 },
			{ name: 'JavaScript', icon: 'javascript', level: 80 },
			{ name: 'C++', icon: 'cpp', level: 75 },
		],
	},
	{
		category: 'Backend & Cloud',
		technologies: [
			{ name: 'Spring Boot', icon: 'spring', level: 90 },
			{ name: 'AWS EC2', icon: 'aws', level: 80 },
			{ name: 'PostgreSQL', icon: 'postgresql', level: 85 },
			{ name: 'MongoDB', icon: 'mongodb', level: 75 },
			{ name: 'Docker', icon: 'docker', level: 70 },
		],
	},
	{
		category: 'Cybersecurity & ML',
		technologies: [
			{ name: 'TensorFlow', icon: 'tensorflow', level: 85 },
			{ name: 'Network Security', icon: 'security', level: 90 },
			{ name: 'SIEM Tools', icon: 'security', level: 80 },
			{ name: 'Linux', icon: 'linux', level: 85 },
			{ name: 'Cryptography', icon: 'security', level: 80 },
		],
	},
	{
		category: 'Frontend & Tools',
		technologies: [
			{ name: 'React', icon: 'react', level: 80 },
			{ name: 'Tailwind CSS', icon: 'tailwind', level: 85 },
			{ name: 'Git/GitHub', icon: 'git', level: 90 },
			{ name: 'VS Code', icon: 'vscode', level: 85 },
			{ name: 'Postman', icon: 'postman', level: 80 },
		],
	},
];

export const contactInfo = {
	email: 'rohanrajekatlae@gmail.com',
	phone: '+91 7666789857',
	location: 'Pune, India',
	social: { 
		github: 'https://github.com/rohankatale', 
		linkedin: 'https://www.linkedin.com/in/rohan-katlae-94574a257/', 
		instagram: 'https://www.instagram.com/rohan_k49/' 
	},
	timezone: 'IST',
};

export const siteConfig: {
	name: string;
	title: string;
	description: string;
	tagline: string;
	heroTitle: string;
	aboutText: string;
	resumeUrl: string;
	services: Service[];
} = {
	name: 'Rohan Katlae',
	title: 'B.Tech CSE Student | Cybersecurity Enthusiast',
	description:
		'I build secure, scalable applications that protect digital infrastructure—\nwhere cybersecurity meets clean code architecture.',
	tagline: 'WHERE SECURITY MEETS INNOVATION.',
	heroTitle: 'I BUILD THE SECURE DIGITAL FUTURE-',
	aboutText:
		"I'm a final year Computer Science & Engineering student at IIIT Pune with a strong passion for cybersecurity and cloud technologies. I specialize in building secure microservices, implementing threat detection systems, and developing robust backend solutions. My expertise spans from Spring Boot applications to machine learning-based security systems on AWS. Currently in the top 7% on TryHackMe and Google Cybersecurity certified.",
	resumeUrl: '/rohnresumenew1.pdf',
	services: [
		{
			title: 'Cybersecurity Solutions',
			description: 'Implementing threat detection systems, security auditing, and building secure applications with modern encryption.',
		},
		{
			title: 'Backend Development',
			description: 'Building scalable microservices with Spring Boot, implementing secure APIs and database architectures.',
		},
		{
			title: 'Machine Learning for Security',
			description: 'Developing ML-based intrusion detection systems and automated threat response solutions.',
		},
	],
};
