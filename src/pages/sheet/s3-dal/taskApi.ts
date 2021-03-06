import { AxiosResponse } from 'axios';
import { instance } from '../../../app/s3-dall/instance';
import { TaskPriorities, TaskStatuses } from '../../../constants/task';
import { ResponseType } from './toDoApi';
import {TaskType} from "../s2-bll/slices/taskSlice";

export const taskApi = {
	// Get portion of tasks for todolist
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
	},

	// Create new task for concrete todolist (max tasks count - 100)
	createTask(todolistId: string, title: string) {
		return instance.post<
			{ title: string },
			AxiosResponse<ResponseType<{ item: TaskType }>>
		>(`/todo-lists/${todolistId}/tasks`, {
			title,
		});
	},

	// You should send the complete UpdateTaskModel object even if you update only one property
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<
			UpdateTaskModelType,
			AxiosResponse<ResponseType<{ items: TaskType }>>
		>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
	},

	// Delete task
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`/todo-lists/${todolistId}/tasks/${taskId}`
		);
	},

	// Change tasks order
	setOrderTask(todolistId: string, taskId: string, putAfterItemId: string) {
		return instance.put<
			{ putAfterItemId: string },
			AxiosResponse<ResponseType>
		>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {
			putAfterItemId,
		});
	},
};

export type UpdateTaskModelType = {
	title?: string;
	description?: string;
	status?: TaskStatuses;
	priority?: TaskPriorities;
	startDate?: string;
	deadline?: string;
};

type GetTasksResponse = {
	items: TaskType[];
	totalCount: number;
	error: string | null;
};
