import { Component, Animation, Curves } from 'core'
import { Position, Line, LinesGroup, Rectangle } from 'elements'

/**
 * Основное отображение данных для графика
 * Используется в качестве родительского класса для своих компонентов
 * 
 * Необходимо переопеределить методы createLines и updateLines
 */
export default class Columns extends Component {

   /**
    * @override
    */
   $onTheme(theme) {

   }

   /**
    * @override
    */
   $onData({dates, columns, colors, names}) {

   }

   /**
    * @override
    */
   $onHideColumn(index) {
      this.animation_data = [false, index]
   }

   /**
    * @override
    */
   $onShowColumn(index) {
      this.animation_data = [true, index]
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.animation_data = []

      this.animation = new Animation({
         component: this,
         duration: theme.main_animation_duration,
         curve: Curves.easeOutCubic,
         handle: this.animate,
         onEnd: () => {
            this.animation_data = []
         }
      })

      this.columns = new Position()

      this.padding = theme.main_padding
      this.height = this.$canvas.height - theme.dates_height - theme.map_height - this.padding
      
      return new Rectangle({
         y: this.padding,
         h: this.height,
         child: this.columns
      })
   }
   
   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      this.$element.w = (this.$columns[0].length-2)*this.scale.x
      this.$element.x = offset.x + this.$theme.main_margin

      if (this.columns.children.length == 0) {
         this.createColumns()
      } else {
         this.updateColumns()
      }
   }

   /**
    * Вычислить новое состояние для каждой колонки
    */
   updateColumns() {}

   /**
    * Прогесс анимации к новому состоянию
    * 
    * @param {*} progress прогресс анимации
    * @param {*} type - true скрыть, false показать
    * @param {*} column_index - индекс колонки для скрытия/показа
    */
   animate(progress, [type, column_index]) {}

   /**
    * Создать колонки
    */
   createColumns() {}
}