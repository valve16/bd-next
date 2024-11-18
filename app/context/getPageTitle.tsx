"use client";
import { useRouter } from 'next/router';

function getPageTitle() {
  const router = useRouter();

  const pageTitles = {
    '/': 'Главная',
    '/dashboard/main_student': 'Моя страница',
    '/dashboard/shedule': 'Расписание',
    '/dashboard/events': 'Мероприятия',
    '/dashboard/video': 'Видео',
    '/dashboard/music': 'Музыка',
  };

  // Возвращаем название из словаря или "Неизвестная страница", если маршрут отсутствует
  return pageTitles[router.pathname] || 'Неизвестная страница';
}

export default getPageTitle;