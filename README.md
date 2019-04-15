# chartio


Фреймворк для создания графиков.

Основная идея заключается в использовании компонентов, как составляющих для графиков. 
Компоненты это готовые блоки, которые содержат определенную логику. Например миникарта, чекбоксы, и тп

Преимущества такого подхода:
1) Переиспользование кода в разных графиках, а значит и меньше однотипного кода
2) Меньше вероятность совершить ошибку при создании очередного графика, т.к не нужно копировать куски кода с прошлых графиков
   Компоненты могут иметь свое API и параметры, что позволяет делать их максимально гибкими
3) Высокая скорость разработки. За счет переиспользования компонентов, вы можете с минимальными усилиями создавать самые разные графики


Структура папок
1) charts - тут находятся графики
2) core - ядро фреймворка
3) elements - элементы, которые рендерятся на холсте. Каждый элемент обязательно имеет render функцию, которя что-то рисует
4) components - бизнес логика графиков. Компоненты созданы для уменьшения кол-ва повторений кода, при созданни графиков. 
   Например есть компонент Navigator и Map, которые можно использовать в нескольких графиках


Основные классы и API.

### 1) Event - класс хелпер, который добавляет методы on и emit
   1. on(event, callback) - подписаться на событие event
   2. emit(event, data, [data2]) - вызвать событие event, уведомив всех подписчиков события.
      Параметры data, data2 будут переданы в callback

### 2) Input - слой ввода данных, наследуется от Event.
   Отвечает за события ввода(мышь, тач), конвертирует координаты в локальные величины(относильно холста) и передает элементам.
   Доступные события:
1. move
2. leave
3. down
4. up
   
### 3) Элементы - группа классов
   Каждый элемент реализует метод render(ctx, input, time), который рисует на холсте, используя API canvas.

   Готовые элементы:
- Circle
- Line - используется для построения линий. Обязательно должен находиться в LineGroup
- Rectangle
- Text
- DragScaling - это прозрачный прямоугольник, который может растягиваться и перетаскиваться пользователем 
Используется в компоненте Navigator
- LineGroup - рендер для линий, чтобы отрисовать путь построенный элементами Line.
Используется только совместно с Line. Создан с целью оптимизации рендеринга
- Position - легкий компонент, который служит для объединения нескольких элементов и/или их позиционирования

В большинстве случаем вам не придется создавать собственные элементы, но иногда возникает такая необходимость.
Например вам нужна особая фигура(многоугольник, треугольник и тп).
В этом случае вы должны создать новый класс элемента и расширить его базовым классом в зависимости от ваших требований.
      
#### Список базовых классов элементов:
- RenderElement - наследуется от Event. Самый простой элемент, который содержит только функцию рендер, и проверку видимости
   **Вы должны переопределить два метода:**
   1. render(ctx, input, time)
   2. isVisible(canvas_width, canvas_height) - если вернет false, объект пропустит цикл рендеринга. Используется фреймворком для оптимизации
   
- HasChildren - наследуется от RenderElement, добавляет возможность элемента иметь несколько дочерних элементов, с относительными координатами
 Необходимо переопределить методы RenderElement класса, а также передать переменную children

- HasChild - наследуется от RenderElement, добавляет возможность элемента иметь один дочерний элемент, с относительными координатами
Необходимо переопределить методы RenderElement класса, а также передать переменную child

- MouseElement - наследуется от HasChild. Имеет все свойства классов RenderElement и HasChild. Добавляет возможность взаимодействия с мышью/тачем.
   Необходимо переопределить методы:
      1. isHover(x, y) - находятся ли координаты на элементе
   Вызывает события:
      1. mousemove
      2. mouseleave
      3. down
      4. up

### 4) Component
   Это строительные блоки, из которых, как из конструктора, собираются графики. Могут состоять из других компонентов и элементов, имеют доступ к данным, теме, языку, анимациям и возможностью вызывать перерисовку холста при необходимости
Каждый компонент должен наследоваться от базового класса Component
   
#### Компоненты можно условно разделить на два типа:
- Те, что выводятся на холст.
         Такие компоненты имеют метод $build(theme, locale), который возвращает Element для рендера
         Например: Navigator, Map
- Те, что не выводятся на холст.
         Эти компоненты не имеют метода $build или имеют, но он ничего не возвращает.
         Например Checkboxes - этот компонент ничего не выводит на холст, т.к создает элементы в DOM. 
         Плюс такого подхода в том, что сохраняется простой доступ к состоянию графика.

Основная разница между ними в наличии метода $build. Поэтому вы сами решаете будет ли отображаться ваш компонент на canvas

#### Компоненты могут переопределить следующие методы
- $onTheme(theme) - вызывается при смене темы
- $onLocale(locale) - вызывается при смене языка
- $onData(data) - вызывается при изменении/получении данных
- $onShowColumn(index) - вызывается после того как была скрыта часть данных(column)
- $onHideColumn(index) - обратное событию 4

#### Методы API:
- $showColumn(index) - скрыть часть данных(column)
- $hideColumn(index) - показать часть данных(column)
- $build(theme, locale) - используется для рендеринга компонента, может вернуть элемент или другой компонент для отображения на холсте.
   
#### Переменные:
- $canvas - хранит текущий canvas
- $hidden_columns - массив, содержаший индексы скрытых данных
- $visible_columns - массив, содержаший индексы видимых данных
- $element - элемент, возвращенный методов $build

### Готовые компоненты
   Находятся в папке /components. Их можно использовать в разных графиках
 - Navigator - навигатор для миникарты, который нужен для взаимодействия пользователя с миникартов.
         Должен быть вложен в компонент Map
- Map
- Checkboxes - чекбоксы для управления видимостью отдельных данных(column)
- Popup - всплывающая подсказка, которая показывается над графиком

### 5) Animation
   Отвечает за анимации в компонентах и перерисовывает компонент если анимация запущена

#### Методы:
1. run([data]) - запускает анимацию
         Параметры:
            1. data - (необязательно) данные которые будут переданы в обработчики

#### Параметры:
1. component - Component в котором работает анимация
2. duration - продолжительность анимации в миллисекундах
3. curve(time) - Временнáя функция, которая задает как прогресс анимации с течением времени. Должна вернуть progress - значение от 0 до 1.
            Вы можете воспользоваться готовыми функциями, для этого импортируйте класс Curves: import { Curves } from 'core'

#### Список функций:
               Curves.linear
               Curves.easeInQuad
               Curves.easeOutQuad
               Curves.easeInOutQuad
               Curves.easeInCubic
               Curves.easeOutCubic
               Curves.easeInOutCubic
               Curves.easeInQuart
               Curves.easeOutQuart
               Curves.easeInOutQuart
               Curves.easeInQuint
               Curves.easeOutQuint
               Curves.easeInOutQuint
            
4. onStart([data]) - вызывается перед началом анимации
         Параметры:
            1. data - (необязательно) данные которые были переданы в функцию запуска run()
4. handle(progress, [data]) - обработчик анимации, тут находится основная логика вашей анимации
         Параметры:
            1. progress - число(float) от 0 до 1
            2. data - (необязательно) данные которые были переданы в функцию запуска run()
5. onEnd() - вызывается после завершения анимации


### 6) Chart
   Это базовый класс графика. Отвечает за передачу данных, темы и языка в компоненты

   Класс должен иметь две переменные:
      1. defaultTheme {Object} - тема по-умолчанию для вашего графика. Может содержать любые данные в формате ключ:значение
      2. defaultLocale {Object} - язык по-умолчанию. Может содеражать любые данные в формате ключ:значение

#### Методы API:
      1. setTheme(theme) - установить тему. Пропущенные значения будут взяты из defaultTheme
      2. setData(data) - установить данные
      3. setLocale(locale) - установить язык. Пропущенные значения будут взяты из defaultLocale

#### События
      1. $onCreate(theme, locale) - вызывается перед инициализацией графика
      2. $onCreated(theme, locale) - вызывается после инициализации

#### Инициализация графика
   Чтобы отобразить график на странице создайте новый экземпляр вашего класса. Например, new MyChart(id, width, height, theme, locale)

### Параметры:
- id {string} - ID элемента, в котором будет создан canvas
- width {number} - ширина
- height {number} - высота
- theme {number} - (необязательно) язык. Пропущенные значения будут взяты из defaultLocale
- locale {number} - (необязательно) тема. Пропущенные значения будут взяты из defaultTheme
