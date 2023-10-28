const data = [
  {
    "id": 1,
    "title": "STEP 1",
    "subtitle": "YOUR INFO",
    "slug": "/your-info", 
    "next": "/select-plan",
    "fields": [
      {
        "id": 10,
        "title": "Personal info",
        "subtitle": "Please provide your name, email address, and phone number.",
        "name": "title",
      },
      {
        "id": 11,
        "label": "Name",
        "placeholder": "e.g. Stephen King",
        "type": "text",
        "name": "fullName",
        "required": true
      },
      {
        "id": 12,
        "label": "Email Address",
        "placeholder": "e.g. stephenking@lorem.com",
        "type": "email",
        "name": "email",
        "required": true
      },
      {
        "id": 13,
        "label": "Phone Number",
        "placeholder": "e.g. +1 234 567 890",
        "type": "tel",
        "name": "phoneNumber",
        "required": true
      }
    ],
    "actions": [
      {
        "id": 100,
        "label": "Next Step",
        "value": "next"
      }
    ]
  },
  {
    "id": 2,
    "title": "STEP 2",
    "subtitle": "SELECT PLAN",
    "next": "/add-ons",
    "slug": "/select-plan",
    "prev": "/your-info",
    "fields": [
      {
        "id": 20,
        "title": "Select your plan",
        "subtitle": "You have the option of monthly or yearly billing.",
        "plans": [
          {
            "id": 200,
            "label": "Arcade",
            "icon": "arcade",
            "value": "arcade",
            "priceMonthly": 9,
            "priceYearly": 90,
            "discount": "2 months free"
          },
          {
            "id": 201,
            "label": "Advanced",
            "icon": "advanced",
            "value": "advanced",
            "priceMonthly": 12,
            "priceYearly": 120,
            "discount": "2 months free"
          },
          {
            "id": 202,
            "label": "Pro",
            "icon": "pro",
            "value": "pro",
            "priceMonthly": 15,
            "priceYearly": 150,
            "discount": "2 months free"
          }
        ],
        "options": [
          {
            "label": "Monthly",
            "value": "monthly",
            "isChecked": true
          },
          {
            "label": "Yearly",
            "value": "yearly",
            "isChecked": false
          }
        ]
      },
    ],
    "actions": [
      {
        "id": 200,
        "label": "Go Back",
        "value": "previous"
      },
      {
        "id": 201,
        "label": "Next Step",
        "value": "next"
      }
    ]
  },
  {
    "id": 3,
    "title": "STEP 3",
    "subtitle": "ADD-ONS",
    "next": "/summary",
    "slug": "/add-ons",
    "prev": "/select-plan",
    "fields": [
      {
        "id": 30,
        "title": "Pick add-ons",
        "subtitle": "Add-ons help enhance your gaming experience.",
        "options": [
          {
            "id": 300,
            "title": "Online service",
            "subtitle": "Access to multiplayer games",
            "priceMonthly": 1,
            "priceYearly": 10,
            "isChecked": true,
          },
          {
            "id": 301,
            "title": "Larger storage",
            "subtitle": "Extra 1TB of cloud save",
            "priceMonthly": 2,
            "priceYearly": 20,
            "isChecked": true,
          },
          {
            "id": 302,
            "title": "Customizable Profile",
            "subtitle": "Custom theme on your profile",
            "priceMonthly": 2,
            "priceYearly": 20,
            "isChecked": false,
          }
        ],
    }],
    "actions": [
      {
        "id": 300,
        "label": "Go Back",
        "value": "previous"
      },
      {
        "id": 301,
        "label": "Next Step",
        "value": "next"
      }
    ]
  },
  {
    "id": 4,
    "title": "STEP 4",
    "subtitle": "SUMMARY",
    "next": "/confirmation",
    "slug": "/summary",
    "prev": "/add-ons",
    "fields": [
      {
        "id": 40,
        "title": "Finishing up",
        "subtitle": "Double-check everything looks OK before confirming.",
      },
      {
        "label": "Total (per month)",
        "price": 0,
      }
    ],
    "actions": [
      {
        "id": 400,
        "label": "Go Back",
        "value": "previous"
      },
      {
        "id": 401,
        "label": "Confirm",
        "value": "confirm"
      }
    ]
  },
]

export default data;
