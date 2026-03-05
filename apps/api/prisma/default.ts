import { Prisma, Visibility } from "@prisma/client";

export function getDefault(fitBodyUserId: string) {
  const defaultExerciseData: (Prisma.ExerciseCreateManyInput & {
    muscleGroups: Prisma.ExerciseMuscleGroupCreateWithoutExerciseInput[];
  })[] = [
    {
      name: "Supino Reto com Barra",
      description:
        "Deite-se de costas no banco com os pés apoiados no chão. Com os braços estendidos, retire a barra do suporte.\nAbaixe a barra até a altura do meio do peito.\n\nLevante a barra até estender completamente os cotovelos.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-barbell-bench-press-side_KciuhbB.jpg",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CHEST",
          role: "PRIMARY",
        },
        {
          muscleGroup: "TRICEPS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "SHOULDERS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Flexão de Braço",
      description:
        "Comece em uma posição de prancha alta, com as mãos apoiadas no chão, alinhadas com os ombros e os pés juntos ou levemente afastados.\nAbaixe o corpo dobrando os cotovelos até que o peito quase toque o chão.\nEmpurre o corpo de volta para a posição inicial estendendo os cotovelos.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CHEST",
          role: "PRIMARY",
        },
        {
          muscleGroup: "TRICEPS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "SHOULDERS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "ABS",
          role: "STABILIZER",
        },
      ],
    },
    {
      name: "Supino Inclinado com Halteres",
      description:
        "Deite-se de costas em um banco inclinado, segurando um haltere em cada mão com os braços estendidos acima do peito.\nAbaixe os halteres lentamente até a altura do meio do peito, mantendo os cotovelos em um ângulo de aproximadamente 45 graus.\nEmpurre os halteres de volta para a posição inicial estendendo completamente os cotovelos.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-incline-bench-press-front_q2q0T12.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CHEST",
          role: "PRIMARY",
        },
        {
          muscleGroup: "TRICEPS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "SHOULDERS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Fly na Máquina",
      description:
        "Sente-se na máquina de fly com as costas apoiadas no encosto e os pés firmemente no chão.\nSegure as alças da máquina com os braços estendidos para os lados, mantendo uma leve flexão nos cotovelos.\nJunte as alças à frente do corpo, contraindo os músculos peitorais, e depois retorne lentamente à posição inicial.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-pec-fly-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CHEST",
          role: "PRIMARY",
        },
        {
          muscleGroup: "SHOULDERS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Desenvolvimento com Halteres",
      description:
        "Sente-se em um banco com encosto, segurando um haltere em cada mão na altura dos ombros, com as palmas voltadas para a frente.\nEmpurre os halteres para cima até que os braços estejam completamente estendidos acima da cabeça.\nAbaixe os halteres de volta à posição inicial controladamente.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-seated-overhead-press-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "SHOULDERS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "TRICEPS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Elevação Frontal com Halteres",
      description:
        "Fique em pé segurando um haltere em cada mão, com os braços estendidos à frente do corpo e as palmas voltadas para baixo.\nLevante os halteres até a altura dos ombros, mantendo os braços estendidos e controlando o movimento.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-front-raise-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "SHOULDERS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Elevação Lateral no Cabo",
      description:
        "Fique em pé ao lado de uma máquina de cabos, segurando a alça com a mão mais próxima da máquina, com o braço estendido ao lado do corpo.\nPuxe a alça para cima e para fora, mantendo o braço estendido, até que esteja na altura do ombro.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-lateral-raise-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "SHOULDERS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Tríceps na Polia Alta",
      description:
        "Fique em pé em frente a uma máquina de polia alta, segurando a barra ou a corda com as mãos na largura dos ombros, com os cotovelos dobrados e próximos ao corpo.\nEmpurre a barra ou a corda para baixo até que os braços estejam completamente estendidos, contraindo os músculos do tríceps.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-push-down-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "TRICEPS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Tríceps Francês com Halteres",
      description:
        "Sente-se em um banco com encosto, segurando um haltere com ambas as mãos acima da cabeça, com os braços estendidos.\nAbaixe o haltere atrás da cabeça dobrando os cotovelos, mantendo os braços próximos às orelhas.\nEmpurre o haltere de volta para a posição inicial estendendo completamente os cotovelos.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-seated-overhead-tricep-extension-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "TRICEPS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Encolhimento de Ombros com Halteres no Banco Inclinado",
      description:
        "Deite-se de frente em um banco inclinado, segurando um haltere em cada mão com os braços estendidos para baixo, ao lado do corpo.\nEncolha os ombros em direção às orelhas, contraindo os músculos trapézio superior.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-laying-silverback-shrug-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "TRAPEZIUS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Encolhimento de Ombros com Halteres em Pé",
      description:
        "Fique em pé segurando um haltere em cada mão com os braços estendidos para baixo, ao lado do corpo.\nEncolha os ombros em direção às orelhas, contraindo os músculos trapézio superior.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-shrug-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "TRAPEZIUS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Remada Curvada com Halteres",
      description:
        "Fique em pé com os pés na largura dos ombros, segurando um haltere em cada mão com os braços estendidos para baixo, ao lado do corpo.\nIncline o tronco para frente a partir dos quadris, mantendo as costas retas e os joelhos levemente flexionados.\nPuxe os halteres em direção ao abdômen, contraindo os músculos das costas, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-row-bilateral-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "UPPER_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "MID_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Pull-down no Cabo com Pegada Neutra",
      description:
        "Sente-se em uma máquina de pulldown com as coxas firmemente apoiadas sob os suportes, segurando a barra com uma pegada neutra (palmas voltadas uma para a outra) na largura dos ombros.\nPuxe a barra para baixo em direção ao peito, contraindo os músculos das costas, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-lat-prayer-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "MID_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "UPPER_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Barra Fixa com Pegada Pronada",
      description:
        "Segure a barra fixa com as mãos na largura dos ombros e as palmas voltadas para longe do corpo (pegada pronada).\nPuxe o corpo para cima até que o queixo esteja acima da barra, contraindo os músculos das costas e dos braços.\nRetorne lentamente à posição inicial controlando o movimento.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-bodyweight-pullup-side.jpg",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "UPPER_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "MID_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "ABS",
          role: "STABILIZER",
        },
      ],
    },
    {
      name: "Barra Fixa com Pegada Supinada",
      description:
        "Segure a barra fixa com as mãos na largura dos ombros e as palmas voltadas para o corpo (pegada supinada).\nPuxe o corpo para cima até que o queixo esteja acima da barra, contraindo os músculos das costas e dos braços.\nRetorne lentamente à posição inicial controlando o movimento.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-bodyweight-chinup-side.jpg",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "MID_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "UPPER_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "FOREARMS_FLEXORS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "ABS",
          role: "STABILIZER",
        },
      ],
    },
    {
      name: "Puxada Alta com Pegada Pronada",
      description:
        "Fique sentado em uma máquina de puxada alta, segurando a barra com as mãos na largura dos ombros e as palmas voltadas para longe do corpo (pegada pronada).\nPuxe a barra para baixo em direção ao peito, contraindo os músculos das costas, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-pulldown-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "MID_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "UPPER_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Remada Baixa com Pegada Pronada na Máquina",
      description:
        "Sente-se em uma máquina de remada baixa, segurando as alças com as mãos na largura dos ombros e as palmas voltadas para baixo (pegada pronada).\nPuxe as alças em direção ao abdômen, contraindo os músculos das costas, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-underhand-row-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "MID_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "UPPER_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "BICEPS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Rosca Direta com Barra",
      description:
        "Fique em pé com os pés na largura dos ombros, segurando uma barra com as mãos na largura dos ombros e as palmas voltadas para cima.\nFlexione os cotovelos para levantar a barra em direção aos ombros, contraindo os músculos dos bíceps, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-curl-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "BICEPS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Rosca Scott com Halteres",
      description:
        "Sente-se em um banco Scott com um haltere em cada mão, mantendo os braços apoiados no banco e as palmas voltadas para cima.\nFlexione os cotovelos para levantar os halteres em direção aos ombros, contraindo os músculos dos bíceps, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-preacher-curl-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "BICEPS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Rosca Direta no Banco Inclinado com Halteres",
      description:
        "Sente-se em um banco inclinado com um haltere em cada mão, mantendo os braços estendidos para baixo e as palmas voltadas para cima.\nFlexione os cotovelos para levantar os halteres em direção aos ombros, contraindo os músculos dos bíceps, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-incline-curl-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "BICEPS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Rosca Martelo com Halteres",
      description:
        "Fique em pé com um haltere em cada mão, mantendo os braços ao lado do corpo e as palmas voltadas para dentro.\nFlexione os cotovelos para levantar os halteres em direção aos ombros, mantendo as palmas voltadas uma para a outra, contraindo os músculos dos bíceps, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-hammer-curl-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "BICEPS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "FOREARMS_FLEXORS",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Flexão de Punho com Halteres",
      description:
        "Sente-se em um banco com um haltere em cada mão, apoiando os antebraços nos joelhos e as palmas voltadas para cima.\nFlexione os punhos para levantar os halteres em direção aos antebraços, contraindo os músculos dos antebraços, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-wrist-curl-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "FOREARMS_FLEXORS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Extensão de Punho com Halteres",
      description:
        "Sente-se em um banco com um haltere em cada mão, apoiando os antebraços nos joelhos e as palmas voltadas para baixo.\nExtenda os punhos para levantar os halteres em direção aos antebraços, contraindo os músculos dos antebraços, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-wrist-extension-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "FOREARMS_EXTENSORS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Superman",
      description:
        "Deite-se de bruços no chão com os braços estendidos à frente do corpo e as pernas estendidas para trás.\nLevante simultaneamente os braços, o peito e as pernas do chão, contraindo os músculos das costas e glúteos.\nMantenha a posição por um momento e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-supermans-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "LOWER_BACK",
          role: "PRIMARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Extensão de Lombar na Máquina",
      description:
        "Sente-se na máquina de extensão lombar com os pés firmemente apoiados nos suportes e as coxas sob os rolos almofadados.\nCruze os braços sobre o peito ou coloque as mãos atrás da cabeça.\nIncline o tronco para frente a partir dos quadris enquanto dobra a coluna, e depois levante o tronco de volta à posição inicial contraindo os músculos lombares com as costas retas.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-machine-back-extensions-side.jpg",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "LOWER_BACK",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Prancha",
      description:
        "Comece em uma posição de prancha com os antebraços apoiados no chão, os cotovelos alinhados com os ombros e o corpo formando uma linha reta dos calcanhares à cabeça.\nMantenha a posição contraindo os músculos do core, glúteos e pernas, evitando que os quadris caiam ou se elevem demais.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-bodyweight-forearm-plank-front.jpg",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "ABS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "LOWER_BACK",
          role: "SECONDARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "STABILIZER",
        },
        {
          muscleGroup: "SHOULDERS",
          role: "STABILIZER",
        },
      ],
    },
    {
      name: "Abdominal",
      description:
        "Deite-se de costas no chão com os joelhos dobrados e os pés apoiados no chão, afastados na largura dos quadris.\nColoque as mãos atrás da cabeça ou cruzadas sobre o peito.\nLevante a parte superior do corpo em direção aos joelhos, contraindo os músculos abdominais, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-crunch-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "ABS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Levantamento Terra com Barra",
      description:
        "Fique em pé com os pés na largura dos ombros, com a barra no chão à sua frente. Dobre os quadris e os joelhos para abaixar o corpo e segure a barra com as mãos na largura dos ombros, usando uma pegada mista (uma palma voltada para você e a outra para longe).\nLevante a barra do chão estendendo os quadris e os joelhos, mantendo as costas retas e o peito para cima.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-stiff-leg-deadlift-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
        {
          muscleGroup: "QUADS",
          role: "SECONDARY",
        },
        {
          muscleGroup: "LOWER_BACK",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Elevação Pélvica na Máquina",
      description:
        "Deite-se de costas em um banco com os pés apoiados no chão e os joelhos dobrados, com a barra da máquina de elevação pélvica posicionada sobre os quadris.\nEmpurre os quadris para cima contraindo os glúteos, levantando a barra e o tronco do banco até que o corpo forme uma linha reta dos ombros aos joelhos.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-plate-loaded-hip-thrust-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Abdução de Quadril na Máquina",
      description:
        "Sente-se na máquina de abdução de quadril com as costas apoiadas no encosto e os pés firmemente nos suportes, com as pernas afastadas na largura dos quadris.\nEmpurre as pernas para fora contra os suportes, afastando os joelhos e contraindo os músculos abdutores do quadril.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-hip-abduction-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Stiff Leg Deadlift com Barra",
      description:
        "Fique em pé com os pés na largura dos ombros, segurando uma barra com as mãos na largura dos ombros, usando uma pegada mista (uma palma voltada para você e a outra para longe).\nIncline o tronco para frente a partir dos quadris, mantendo as costas retas e os joelhos levemente flexionados, abaixando a barra em direção ao chão.\nLevante a barra de volta à posição inicial estendendo os quadris e os joelhos, contraindo os músculos posteriores da coxa e glúteos.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-stiff-leg-deadlift-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "HAMSTRINGS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
        {
          muscleGroup: "LOWER_BACK",
          role: "SECONDARY",
        },
      ],
    },
    {
      name: "Mesa Flexora",
      description:
        "Deite-se de bruços na máquina de mesa flexora, com os tornozelos posicionados sob os rolos almofadados e as coxas firmemente apoiadas no banco.\nSegure as alças da máquina para estabilidade.\nFlexione os joelhos para levantar os rolos em direção aos glúteos, contraindo os músculos posteriores da coxa, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-hamstring-curl-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "HAMSTRINGS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Cadeira Flexora",
      description:
        "Sente-se na máquina de cadeira flexora com as costas apoiadas no encosto e os pés firmemente nos suportes, com os joelhos dobrados a 90 graus.\nSegure as alças da máquina para estabilidade.\nFlexione os joelhos para levantar os rolos em direção aos glúteos, contraindo os músculos posteriores da coxa, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-seated-hamstring-curl-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "HAMSTRINGS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Cadeira Extensora",
      description:
        "Sente-se na máquina de cadeira extensora com as costas apoiadas no encosto e os pés firmemente nos suportes, com os joelhos dobrados a 90 graus.\nSegure as alças da máquina para estabilidade.\nExtenda os joelhos para levantar os rolos em direção à frente do corpo, contraindo os músculos quadríceps, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-extension-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "QUADS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Leg Press 45°",
      description:
        "Sente-se na máquina de leg press 45° com as costas apoiadas no encosto e os pés firmemente na plataforma, com os joelhos dobrados a 90 graus.\nSegure as alças da máquina para estabilidade.\nEmpurre a plataforma para longe do corpo estendendo os joelhos, contraindo os músculos quadríceps, glúteos e posteriores da coxa, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-leg-press-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "QUADS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Hack Machine",
      description:
        "Sente-se na máquina de hack com as costas apoiadas no encosto e os pés firmemente na plataforma, com os joelhos dobrados a 90 graus.\nSegure as alças da máquina para estabilidade.\nEmpurre a plataforma para longe do corpo estendendo os joelhos, contraindo os músculos quadríceps, glúteos e posteriores da coxa, e depois retorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-hack-squat-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "QUADS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Agachamento com Barra",
      description:
        "Fique em pé com os pés na largura dos ombros, com a barra apoiada na parte superior das costas, segurando-a com as mãos na largura dos ombros.\nDobre os quadris e os joelhos para abaixar o corpo em direção ao chão, mantendo as costas retas e o peito para cima.\nEmpurre o corpo de volta para a posição inicial estendendo os quadris e os joelhos, contraindo os músculos das pernas e glúteos.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-squat-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "QUADS",
          role: "PRIMARY",
        },
        {
          muscleGroup: "GLUTES",
          role: "PRIMARY",
        },
        {
          muscleGroup: "LOWER_BACK",
          role: "STABILIZER",
        },
        {
          muscleGroup: "ABS",
          role: "STABILIZER",
        },
      ],
    },
    {
      name: "Adução de Quadril na Máquina",
      description:
        "Sente-se na máquina de adução de quadril com as costas apoiadas no encosto e os pés firmemente nos suportes, com as pernas afastadas na largura dos quadris.\nPuxe as pernas para dentro contra os suportes, aproximando os joelhos e contraindo os músculos adutores do quadril.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-hip-adduction-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "QUADS",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Elevação de Panturrilha em Pé na Máquina",
      description:
        "Fique em pé na máquina de elevação de panturrilha, com os ombros sob os suportes e os pés firmemente na plataforma, com os calcanhares pendurados para fora.\nEmpurre a plataforma para cima elevando os calcanhares o mais alto possível, contraindo os músculos da panturrilha.\nRetorne lentamente à posição inicial controlando o movimento.",
      image:
        "https://media.musclewiki.com/media/uploads/og-male-machine-standing-calf-raises-front.jpg",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CALVES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Elevação de Panturrilha Sentado na Máquina",
      description:
        "Sente-se na máquina de elevação de panturrilha, com os joelhos sob os suportes e os pés firmemente na plataforma, com os calcanhares pendurados para fora.\nEmpurre a plataforma para cima elevando os calcanhares o mais alto possível, contraindo os músculos da panturrilha.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-seated-calf-raise-side.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CALVES",
          role: "PRIMARY",
        },
      ],
    },
    {
      name: "Elevação de Panturrilha no Smith Machine",
      description:
        "Fique em pé com os pés na largura dos ombros, com a barra do Smith Machine apoiada na parte superior das costas, segurando-a com as mãos na largura dos ombros.\nEmpurre a barra para cima elevando os calcanhares o mais alto possível, contraindo os músculos da panturrilha.\nRetorne lentamente à posição inicial controlando o movimento.",
      video:
        "https://media.musclewiki.com/media/uploads/videos/branded/male-Smithmachine-calf-raise-front.mp4",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      muscleGroups: [
        {
          muscleGroup: "CALVES",
          role: "PRIMARY",
        },
      ],
    },
  ];

  const defaultWorkoutPlanData: (Prisma.WorkoutPlanCreateManyInput & {
    workoutDays: (Prisma.WorkoutDayCreateWithoutWorkoutPlanInput & {
      workoutDayExercises?: {
        seq: number;
        exerciseName: string;
      }[];
    })[];
  })[] = [
    {
      name: "Full Body - 3x por Semana",
      description:
        "Treino de corpo inteiro realizado três vezes por semana, com foco em exercícios compostos para trabalhar todos os grupos musculares principais em cada sessão.",
      goal: "Ganhar Massa Muscular",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      workoutDays: [
        {
          dayCode: "A",
          seq: 1,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Leg Press 45°",
              seq: 1,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 2,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 3,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 4,
            },

            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 5,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 6,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 7,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 8,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 9,
            },
          ],
        },
        {
          dayCode: "Rest",
          seq: 2,
          type: "REST",
        },
        {
          dayCode: "B",
          seq: 3,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 1,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 2,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 3,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 4,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 5,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 6,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 7,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 8,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 9,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 10,
            },
          ],
        },
        {
          dayCode: "Rest",
          seq: 4,
          type: "REST",
        },
        {
          dayCode: "C",
          seq: 5,
          type: "WORKOUT",
          focus: "BODYBUILDING",

          workoutDayExercises: [
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 1,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 2,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 3,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 4,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 5,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 6,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 7,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 8,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 9,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 10,
            },
          ],
        },
      ],
    },
    {
      name: "Upper/Lower - 4x por Semana",
      description:
        "Treino dividido em parte superior e inferior do corpo, realizado quatro vezes por semana, com dois dias dedicados à parte superior e dois dias à parte inferior.",
      goal: "Ganhar Massa Muscular",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      workoutDays: [
        {
          dayCode: "Upper A",
          seq: 1,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 1,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 2,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 3,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 4,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 5,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 6,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 7,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 8,
            },
            {
              exerciseName: "Tríceps na Polia Alta",
              seq: 9,
            },
            {
              exerciseName: "Tríceps na Polia Alta",
              seq: 10,
            },
          ],
        },
        {
          dayCode: "Lower A",
          seq: 2,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Leg Press 45°",
              seq: 1,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 2,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 3,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 4,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 5,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 6,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 7,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 8,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 9,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 10,
            },
          ],
        },
        {
          dayCode: "Rest",
          seq: 3,
          type: "REST",
        },
        {
          dayCode: "Upper B",
          seq: 4,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Barra Fixa com Pegada Supinada",
              seq: 1,
            },
            {
              exerciseName: "Barra Fixa com Pegada Supinada",
              seq: 2,
            },
            {
              exerciseName: "Barra Fixa com Pegada Supinada",
              seq: 3,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 4,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 5,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 6,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 7,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 8,
            },
          ],
        },
        {
          dayCode: "Lower B",
          seq: 5,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 1,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 2,
            },
            {
              exerciseName: "Hack Machine",
              seq: 3,
            },
            {
              exerciseName: "Hack Machine",
              seq: 4,
            },
            {
              exerciseName: "Hack Machine",
              seq: 5,
            },
            {
              exerciseName: "Hack Machine",
              seq: 6,
            },
            {
              exerciseName: "Cadeira Flexora",
              seq: 7,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 8,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 9,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 10,
            },
          ],
        },
      ],
    },
    {
      name: "Push/Pull/Legs - 6x por Semana",
      description:
        "Treino dividido em empurrar, puxar e pernas, realizado seis vezes por semana, com dois dias dedicados a cada tipo de treino para maximizar o volume e a recuperação.",
      goal: "Ganhar Massa Muscular",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      workoutDays: [
        {
          dayCode: "Push A",
          seq: 1,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Supino Reto com Barra",
              seq: 1,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 2,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 3,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 4,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 5,
            },
            {
              exerciseName: "Tríceps na Polia Alta",
              seq: 6,
            },
            {
              exerciseName: "Tríceps na Polia Alta",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Pull A",
          seq: 2,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 1,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 2,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 3,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 4,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 5,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 6,
            },
            {
              exerciseName: "Rosca Martelo com Halteres",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Legs A",
          seq: 3,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Leg Press 45°",
              seq: 1,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 2,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 3,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 4,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 5,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 6,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 7,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 8,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 9,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 10,
            },
          ],
        },
        {
          dayCode: "Push B",
          seq: 4,
          type: "WORKOUT",
          focus: "BODYBUILDING",

          workoutDayExercises: [
            {
              exerciseName: "Supino Inclinado com Halteres",
              seq: 1,
            },
            {
              exerciseName: "Supino Inclinado com Halteres",
              seq: 2,
            },
            {
              exerciseName: "Supino Inclinado com Halteres",
              seq: 3,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 4,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 5,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 6,
            },
            {
              exerciseName: "Tríceps na Polia Alta",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Pull B",
          seq: 5,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 1,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 2,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 3,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 4,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 5,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 6,
            },
            {
              exerciseName: "Rosca Martelo com Halteres",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Legs B",
          seq: 6,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 1,
            },
            {
              exerciseName: "Stiff Leg Deadlift com Barra",
              seq: 2,
            },
            {
              exerciseName: "Hack Machine",
              seq: 3,
            },
            {
              exerciseName: "Hack Machine",
              seq: 4,
            },
            {
              exerciseName: "Hack Machine",
              seq: 5,
            },
            {
              exerciseName: "Hack Machine",
              seq: 6,
            },
            {
              exerciseName: "Cadeira Flexora",
              seq: 7,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 8,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 9,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 10,
            },
          ],
        },
      ],
    },
    {
      name: "Bro Split - 5x por Semana",
      description:
        "Treino dividido por grupos musculares, realizado cinco vezes por semana, com cada dia dedicado a um grupo muscular específico para foco e intensidade máximos.",
      goal: "Ganhar Massa Muscular",
      visibility: Visibility.PUBLIC,
      createdById: fitBodyUserId,
      workoutDays: [
        {
          dayCode: "Peito",
          seq: 1,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Supino Reto com Barra",
              seq: 1,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 2,
            },
            {
              exerciseName: "Supino Reto com Barra",
              seq: 3,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 4,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 5,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 6,
            },
            {
              exerciseName: "Fly na Máquina",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Costas",
          seq: 2,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 1,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 2,
            },
            {
              exerciseName: "Puxada Alta com Pegada Pronada",
              seq: 3,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 4,
            },
            {
              exerciseName: "Remada Curvada com Halteres",
              seq: 5,
            },
            {
              exerciseName: "Pull-down no Cabo com Pegada Neutra",
              seq: 6,
            },
            {
              exerciseName: "Pull-down no Cabo com Pegada Neutra",
              seq: 7,
            },
            {
              exerciseName: "Pull-down no Cabo com Pegada Neutra",
              seq: 8,
            },
          ],
        },
        {
          dayCode: "Pernas",
          seq: 3,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Leg Press 45°",
              seq: 1,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 2,
            },
            {
              exerciseName: "Leg Press 45°",
              seq: 3,
            },
            {
              exerciseName: "Cadeira Flexora",
              seq: 4,
            },
            {
              exerciseName: "Cadeira Flexora",
              seq: 5,
            },
            {
              exerciseName: "Cadeira Flexora",
              seq: 6,
            },
            {
              exerciseName: "Cadeira Extensora",
              seq: 7,
            },
            {
              exerciseName: "Cadeira Extensora",
              seq: 8,
            },
            {
              exerciseName: "Cadeira Extensora",
              seq: 9,
            },
            {
              exerciseName: "Mesa Flexora",
              seq: 10,
            },
            {
              exerciseName: "Mesa Flexora",
              seq: 11,
            },
            {
              exerciseName: "Mesa Flexora",
              seq: 12,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 13,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 14,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 15,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 16,
            },
            {
              exerciseName: "Elevação de Panturrilha em Pé na Máquina",
              seq: 17,
            },
          ],
        },
        {
          dayCode: "Ombros",
          seq: 4,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Desenvolvimento com Halteres",
              seq: 1,
            },
            {
              exerciseName: "Desenvolvimento com Halteres",
              seq: 2,
            },
            {
              exerciseName: "Desenvolvimento com Halteres",
              seq: 3,
            },
            {
              exerciseName: "Elevação Frontal com Halteres",
              seq: 4,
            },
            {
              exerciseName: "Elevação Frontal com Halteres",
              seq: 5,
            },
            {
              exerciseName: "Elevação Lateral no Cabo",
              seq: 6,
            },
            {
              exerciseName: "Elevação Lateral no Cabo",
              seq: 7,
            },
          ],
        },
        {
          dayCode: "Braços",
          seq: 5,
          type: "WORKOUT",
          focus: "BODYBUILDING",
          workoutDayExercises: [
            {
              exerciseName: "Rosca Direta com Barra",
              seq: 1,
            },
            {
              exerciseName: "Rosca Direta com Barra",
              seq: 2,
            },
            {
              exerciseName: "Rosca Direta com Barra",
              seq: 3,
            },
            {
              exerciseName: "Tríceps Francês com Halteres",
              seq: 4,
            },
            {
              exerciseName: "Tríceps Francês com Halteres",
              seq: 5,
            },
            {
              exerciseName: "Tríceps Francês com Halteres",
              seq: 6,
            },
          ],
        },
      ],
    },
  ];

  return { defaultExerciseData, defaultWorkoutPlanData };
}
