# Advanced Angular Todo List

A feature-rich task management application built with Angular and styled with Tailwind CSS.

![Advanced Todo App Screenshot](https://via.placeholder.com/800x450)

## Features

- ✅ Create, read, update, and delete tasks
- 🔄 Mark tasks as complete/incomplete
- 🏷️ Categorize tasks with custom categories
- 🚩 Assign priority levels (high, medium, low)
- 📅 Set due dates for tasks
- 🔍 Advanced filtering and searching
- 🔄 Sort tasks by various criteria
- 📱 Responsive design
- 💾 Local storage persistence

## Technologies Used

- **Angular** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive extensions library
- **LocalStorage API** - For data persistence

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/kareemtaha-coder/to-do-list.git
cd to-do-list
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── task-form/
│   │   │   ├── task-form.component.ts
│   │   │   └── task-form.component.html
│   │   ├── task-list/
│   │   │   ├── task-list.component.ts
│   │   │   └── task-list.component.html
│   │   └── task-item/
│   │       ├── task-item.component.ts
│   │       └── task-item.component.html
│   ├── models/
│   │   └── task.model.ts
│   ├── services/
│   │   └── task.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
├── styles.css
└── ...
```

## Usage Guide

### Adding a Task

1. Click the "Add Task" button
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Priority (high, medium, low)
   - Category
   - Due Date (optional)
3. Click "Add Task" to save

### Managing Tasks

- Click the checkbox to mark a task as complete/incomplete
- Click the task title to expand and see its full description
- Use the edit button to modify task details
- Use the delete button to remove a task

### Filtering and Sorting

- Use the status dropdown to filter by All, Active, or Completed tasks
- Use the priority dropdown to filter tasks by priority level
- Use the category dropdown to filter tasks by category
- Use the search box to find tasks by title or description
- Use the sort dropdown to order tasks by Created Date, Due Date, Priority, or Title
- Click the sort direction button to toggle between ascending and descending order

### Adding More Features

Some ideas for extending the app:

- Task tagging
- Recurring tasks
- Task notes or comments
- Task sharing
- Dark mode
- User authentication
- Cloud synchronization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the styling utilities
- Angular team for the amazing framework
- All contributors and users of this app
