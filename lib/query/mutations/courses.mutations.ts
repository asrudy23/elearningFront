import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createCourse } from '../../../app/types/courses';
import { createChapter } from '../../../app/types/chapters';
import { createQuiz } from '../../../app/types/quizzes';

// La 'mutationFn' prendra l'état complet de la page comme argument
export const useCreateCourseFlowMutation = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (courseData: any) => {
      // --- ÉTAPE 1: CRÉER LE COURS DE BASE ---
      const courseFormData = new FormData();
      courseFormData.append('title', courseData.title);
      courseFormData.append('description', courseData.description);
      // --- MODIFICATION : Ajout de la catégorie ---
      courseFormData.append('category', courseData.category); 
      // Pour l'instant, on met un teacherId en dur (ex: 1).
      // Idéalement, il viendrait de l'utilisateur connecté ou d'une sélection.
      courseFormData.append('teacherIds', '1'); 
      if (courseData.coverImage) {
        courseFormData.append('file', courseData.coverImage);
      }
      const createdCourse = await createCourse(courseFormData);
      
      // --- ÉTAPE 2: CRÉER CHAQUE CHAPITRE ET SON QUIZ ---
      for (const chapter of courseData.chapters) {
        const chapterFormData = new FormData();
        chapterFormData.append('title', chapter.title);
        chapterFormData.append('courseId', createdCourse.id.toString());
        
        chapter.lessons.forEach((lesson: any, index: number) => {
          chapterFormData.append(`lessons[${index}].title`, lesson.title);
          chapterFormData.append(`lessons[${index}].content`, lesson.content);
          if (lesson.file) {
            chapterFormData.append(`lessons[${index}].file`, lesson.file);
          }
        });
        
        const createdChapter = await createChapter(chapterFormData);
        
        if (chapter.quiz && chapter.quiz.length > 0) {
          await createQuiz({
            type: 'CHAPTER',
            title: `Quiz - ${chapter.title}`,
            chapterId: createdChapter.id,
            courseId: createdCourse.id,
            questions: chapter.quiz.map((q: any) => ({
              text: q.question,
              options: q.answers,
              correctAnswer: q.answers[q.correctAnswer],
            })),
          });
        }
      }
      
      // --- ÉTAPE 3: CRÉER LE QUIZ FINAL ---
      if (courseData.finalQuiz && courseData.finalQuiz.length > 0) {
        await createQuiz({
          type: 'FINAL',
          title: `Quiz Final - ${createdCourse.title}`,
          courseId: createdCourse.id,
          questions: courseData.finalQuiz.map((q: any) => ({
            text: q.question,
            options: q.answers,
            correctAnswer: q.answers[q.correctAnswer],
          })),
        });
      }
      
      return createdCourse;
    },
    onSuccess: (createdCourse) => {
      toast({
        title: "Cours créé avec succès !",
        description: `Le cours "${createdCourse.title}" a été publié.`,
      });
      router.push("/teacher/courses");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur lors de la création",
        description: error.response?.data?.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    },
  });
};