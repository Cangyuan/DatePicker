<template>
  <Row style="overflow: hidden;">
    <div class="e-calendar-wrapper">
      <div class="e-calendar" v-show='displayOpen' v-swipedown="(e)=>vueTouch('下滑',e)" v-swipeleft="(e)=>vueTouch('nextWeek',e)"
          v-swiperight="(e)=>vueTouch('prevWeek',e)">
        <div class="e-date-select">
          <div class="e-date-monthday">
            <transition name="fadeY">
              <div :key="selectDate.day" class="e-date-monthday-select" :class="{'active': !showYear}" @click="openCalendarList">
                <span>{{ selectDate.year }}-{{keepDoubleDigit(selectDate.month + 1)}}-{{keepDoubleDigit(selectDate.day) ? keepDoubleDigit(selectDate.day) : dayValue}}</span>
               </div>
            </transition>
            <span class="today" @click="selectToday(nowDate.getFullYear(),(nowDate.getMonth() - 1),nowDate.getDate())">今天{{nowDate.getDay()}}
            </span>
          </div>
        </div>
        <div class="e-calendar-container" v-show="!showYear">
          <div class="e-calendar-week">
            <span class="e-calendar-week-day">日</span>
            <span class="e-calendar-week-day">一</span>
            <span class="e-calendar-week-day">二</span>
            <span class="e-calendar-week-day">三</span>
            <span class="e-calendar-week-day">四</span>
            <span class="e-calendar-week-day">五</span>
            <span class="e-calendar-week-day">六</span> 
          </div>
          <div class="e-calendar-monthday">
            <transition :name="fadeXType">
              <div :key="showDate.monthStr" class="e-calendar-monthday-wrapper">
                <div class="e-calendar-monthday-row" v-for="row in iRows " >
                <span v-for="day in row"  class="e-calendar-monthday-row-day" @click="selectDay(day)" :class="{'active': day.selected || (day.value == dayValue && dayValue), 'disabled': day.disabled, 'pointer': day.value !== ''}">
                  <span v-text="day.value" class="e-calendar-monthday-row-day-value" ></span>
                   <transition name="e_calendar_day">
                     <span class="e-calendar-monthday-row-day-cover" v-if="day.selected || day.value == dayValue && dayValue"></span>
                     <span class="e-calendar-monthday-row-day-today" v-show="nowDate.getFullYear() == showDate.year && ((nowDate.getMonth()) == showDate.month) && nowDate.getDate() == day.value"></span>
                   </transition>
                </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <ul class="e-calendar-year" v-show="showYear" ref="yearList">
          <li v-for="item in yearList" v-text="item" :class="{'active': item === selectDate.year}" @click="selectYear(item)"></li>
        </ul>
        <div class="e-calendar-actions">
          <img style="width: 14px;position: relative;top: -4px;" src="../imgs/down.png" />
        </div> 
      </div>
      <div class="e-calendar" v-show='!displayOpen' v-swipeleft="(e)=>vueTouch('nextMonth',e)" v-swiperight="(e)=>vueTouch('prevMonth',e)" v-swipeup="(e)=>vueTouch('上滑',e)">
        <div class="e-date-select">
          <div class="e-date-monthday">
            <transition name="fadeY">
              <div :key="selectDate.day" class="e-date-monthday-select" :class="{'active': !showYear}" @click="openCalendarList">
                <span>{{ selectDate.year }}-{{keepDoubleDigit(selectDate.month + 1)}}-{{keepDoubleDigit(selectDate.day) ? keepDoubleDigit(selectDate.day) : (dayValue || selectDate.day)}}</span>
               </div>
            </transition>
            <span class="today" @click="selectToday(nowDate.getFullYear(),(nowDate.getMonth() - 1),nowDate.getDate())">今天
            </span>
          </div>
        </div>
        <div class="e-calendar-container" v-show="!showYear">
          <div class="e-calendar-week">
            <span class="e-calendar-week-day">日</span>
            <span class="e-calendar-week-day">一</span>
            <span class="e-calendar-week-day">二</span>
            <span class="e-calendar-week-day">三</span>
            <span class="e-calendar-week-day">四</span>
            <span class="e-calendar-week-day">五</span>
            <span class="e-calendar-week-day">六</span>
          </div>

          <div class="e-calendar-monthday-long">
            <transition :name="fadeXType">
              <div :key="showDate.monthStr" class="e-calendar-monthday-wrapper">
                <div class="e-calendar-monthday-row" v-for="row in rows" >
                <span v-for="day in row"  class="e-calendar-monthday-row-day" @click="selectDay(day)" :class="{'active': day.selected || (day.value == dayValue && dayValue), 'disabled': day.disabled, 'pointer': day.value !== ''}">
                  <span v-text="day.value" class="e-calendar-monthday-row-day-value" ></span>
                   <transition name="e_calendar_day">
                     <span class="e-calendar-monthday-row-day-cover" v-if="day.selected || day.value == dayValue && dayValue"></span>
                     <span class="e-calendar-monthday-row-day-today" v-show="nowDate.getFullYear() == showDate.year && ((nowDate.getMonth()) == showDate.month) && nowDate.getDate() == day.value"></span>
                   </transition>
                </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <ul class="e-calendar-year" v-show="showYear" ref="yearList">
          <li v-for="item in yearList" v-text="item" :class="{'active': item === selectDate.year}" @click="selectYear(item)"></li>
        </ul>
        <div class="e-calendar-actions">
          <img style="width: 18px;position: relative;top: -4px;" src="../imgs/up.png" />
        </div> 
      </div> 
    </div>
    <Tabs value="name1">
        <TabPane label="已设置提醒" name="name1">
          <ul class="list-card">
            <li>
              <Row class="list">
                <h4>227市场</h4>
                <p>市场依据和客户判定</p>
                <p class="role-1">我的角色：经办人</p>
                <span class="list-time">12:00</span>
                <Icon type="ios-more" />
              </Row>
            </li>
            <li>
              <Row class="list">
                <h4>新软件</h4>
                <p>成立体验小组，测试软件</p>
                <p class="role-1">我的角色：经办人</p>
                <span class="list-time">12:00</span>
                <Icon type="ios-more" />
              </Row>
            </li>
            <li>
              <Row class="list">
                <h4>2-3-6手提项目</h4>
                <p>市场依据和客户判定</p>
                <p class="role-2">我的角色：交办人</p>
                <span class="list-time">12:00</span>
                <Icon type="ios-more" />
              </Row>
            </li>
            <li>
              <Row class="list">
                <h4>消防资格考试</h4>
                <p>市场依据和客户判定</p>
                <p class="role-1">我的角色：经纪人</p>
                <span class="list-time">12:00</span>
                <Icon type="ios-more" />
              </Row>
            </li>
            <li>
              <Row class="list">
                <h4>总裁班招新</h4>
                <p>市场依据和客户判定</p>
                <p class="role-1">我的角色：经纪人</p>
                <span class="list-time">12:00</span>
                <Icon type="ios-more" />
              </Row>
            </li>
          </ul>
        </TabPane>
        <TabPane label="创建时间" name="name2"></TabPane>
        <TabPane label="最后发言时间" name="name3"></TabPane>
    </Tabs>
    <Row class="footer">
        <i-col>
          <Icon type="ios-flash" />
          <div>工作</div>
        </i-col>
        <i-col>
          <Icon type="md-woman" />
          <div>角色</div>
        </i-col>
        <i-col>
          <img src="../imgs/3.png" />
          <div>事项圈</div>
        </i-col>
        <i-col>
          <img style="width: 30px;position: relative;top: -4px;" src="../imgs/4.jpg" />
          <div style="position: relative;top: -10px;">同事</div>
        </i-col>
        <i-col>
          <Icon type="ios-calendar" />
          <div>日历</div>
        </i-col>
    </Row>
  </Row>
</template>
<script>
/*eslint-disable*/  
  // 阿拉伯数字 转 汉字数字的基本库
  const weekJson = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期日',
  };
  const monthJson = {
    0: '一月',
    1: '二月',
    2: '三月',
    3: '四月',
    4: '五月',
    5: '六月',
    6: '七月',
    7: '八月',
    8: '九月',
    9: '十月',
    10: '十一月',
    11: '十二月',
  };
  export default {
    name: 'DatePicker',
    props: {
      // 打开date picker的初始值，必传，格式是（2017-08-11）
      date: {
        type: String,
        required: true
      },
      // 日期最小值
      minDate: {
        type: String,
        default: '1970-01-01'
      },
      // 日期最大值
      maxDate: {
        type: String,
        default: '2020-12-31'
      },
    },
    computed: {
      yearList() {
        const result = [];
        for (let i = this.copyMinDate.year; i <= this.copyMaxDate.year; i += 1) {
          result.push(i);
        }
        return result;
      },
      title() {
        // calendar 上面的所有 title 信息包括二部分
        return {
          year: '',
          monthday: '',
        };
      },
      iRows() {
        const { year, month } = this.showDate;
        const months = (new Date(year, month, 0)).getDate();
        const aonth = (new Date(year, month, 0)).getMonth();
        const result = [];
        let minRow = [];
        let row = [];
        let weekValue;
        let iKey = 0;
        // 按照星期分组
        for (let i = 1; i <= months; i += 1) {
          // 根据日期获取星期，并让开头是1，而非0
          weekValue = (new Date(year, month, i)).getDay();
          // 判断月第一天在星期几，并填充前面的空白区域
          if (i === 1 && weekValue !== 0) {
            this.addRowEmptyValue(row, weekValue);
            this.addRowDayValue(row, i);
          } else {
            this.addRowDayValue(row, i);
            // 判断月最后一天在星期几，并填充后面的空白区域
            if (i === months && weekValue !== 6) {
              this.addRowEmptyValue(row, (6 - weekValue));
            }
          }

          // 按照一周分组
          if ((weekValue +1) % 7 === 0 || i === months) {
            result.push(row);
            row = [];
          }
        }
        this.monthArr = result;     
        if (result && result.length){
          result.forEach((item, index) => {
            if (item && item.length){
              item.forEach((item1, key) => {
                if(item1.value == this.selectDate.day && !this.weekSwich){
                  this.iKey = index;
                  console.log(this.iKey,this.iIndex)
                  if(!this.weekSwich){
                    this.minRowArr = [];
                    this.minRowArr.push(item);
                    minRow = [];
                    minRow.push(item);
                  }
                }
                if(item1.value == this.todayValue && this.todayValue != 0){
                  this.iKey = index;
                  console.log(index)
                }

              })
            }
          })
        }
        if( this.iIndex > 0 ){ 
          minRow = [];
          minRow.push(result[this.iKey + this.iIndex]);
          minRow = [];   
          if(this.iKey + this.iIndex < result.length){    
            minRow.push(result[this.iKey + this.iIndex]);
          }else{ 
            this.nextMonth();
            this.$nextTick(function () {
              this.iKey = 0;
              this.iIndex = 0;
              minRow.push(result[0]);
            })         
             minRow = this.minRowArr;
          }              
        } 
        this.showDate.monthStr = monthJson[this.showDate.month];
        this.monthArr = result;
        if( this.iIndex < 0){
          minRow = [];
          if(this.iKey + this.iIndex >= 0){           
            minRow.push(result[this.iKey + this.iIndex]);
          }else{ 
            //this.prevMonth();
            console.log(this.iKey,this.iIndex)                     
            this.iKey = 4;
            this.iIndex = 0; 
            minRow.push(result[result.length-1]);             
          }        
        }
        if( minRow.length == 0 ){
          if(this.weekSwich == 'prev' || this.iKey == result.length-1){
            //iKey = 0;
            minRow.push(result[result.length-1]);
          }else{
            minRow.push(result[0]);
          } 
        } 
        if(this.todayValue){
          minRow = [];
          minRow.push(result[this.iKey]);
        }   
        return minRow;
      },
      rows() {
        const { year, month } = this.showDate;
        const months = (new Date(year, month, 0)).getDate();
        const result = [];
        let row = [];
        let weekValue;
        // 按照星期分组
        /***for (let i = 1; i <= months; i += 1) {
          // 根据日期获取星期，并让开头是1，而非0
          weekValue = (new Date(year, month, i)).getDay() + 1;
          // 判断月第一天在星期几，并填充前面的空白区域
          if (i === 1 && weekValue !== 1) {
            this.addRowEmptyValue(row, weekValue);
            this.addRowDayValue(row, i);
          } else {
            this.addRowDayValue(row, i);
            // 判断月最后一天在星期几，并填充后面的空白区域
            if (i === months && weekValue !== 7) {
              this.addRowEmptyValue(row, (7 - weekValue) + 1);
            }
          }
          // 按照一周分组
          if (weekValue % 7 === 0 || i === months) {
            result.push(row);
            row = [];
          }
        }***/
        // 按照星期分组
        for (let i = 1; i <= months; i += 1) {
          // 根据日期获取星期，并让开头是1，而非0
          weekValue = (new Date(year, month, i)).getDay();
          // 判断月第一天在星期几，并填充前面的空白区域
          if (i === 1 && weekValue !== 0) {
            //console.log(weekValue,i,aonth)
            this.addRowEmptyValue(row, weekValue);
            this.addRowDayValue(row, i);
          } else {
            this.addRowDayValue(row, i);
            // 判断月最后一天在星期几，并填充后面的空白区域
            if (i === months && weekValue !== 6) {
              this.addRowEmptyValue(row, (6 - weekValue));
            }
          }

          // 按照一周分组
          if ((weekValue + 1) % 7 === 0 || i === months) {
            result.push(row);
            row = [];
          }
        }

        this.showDate.monthStr = monthJson[this.showDate.month];
        //console.log(result);
        return result;
      },
    },
    data() {
      return {
        name:'touch',
        displayOpen: true,
        todayValue: 0,
        weekSwich: '',
        minRowArr: [],
        selectDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          weekStr: '',
          monthStr: '',
        }, // 选择的时间，默认是用户传的date时间
        showDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          monthStr: '',
          weekStr: '',
        },
        copyMinDate: {
          year: '',
          month: '',
          day: '',
        },
        copyMaxDate: {
          year: '',
          month: '',
          day: '',
        },
        toolbar: '',
        fadeXType: 'fadeX_Prev',
        nextMonthClick: false,
        prevMonthClick: false,
        prevWeekClick: false,
        nextWeekClick: false,
        showYear: false,
        isNow: false,
        nowDate: new Date(),
        dayValue: '',
        weekValue: 0,
        monthArr: [],
        iIndex: 0,
        iKey: 0,
        isOn: false,
        defday: '',
      };
    },
    created() {
      this.initDatePicker();
    },
    methods: {
      vueTouch:function(txt,e){
        this.name = txt;
        if(txt == 'nextWeek'){
          this.nextWeek();
        }else if(txt == 'prevWeek'){
          this.prevWeek();
        }else if(txt == '上滑'){
          this.displayOpen = true;
        }else if(txt == '下滑'){
          this.displayOpen = false;
        }else if(txt == 'nextMonth'){

          this.dayValue = ''
           console.log(this.selectDate.day);
          this.nextMonth();
        }else if(txt == 'prevMonth'){
          console.log(this.selectDate.day);
          this.dayValue = '';
          this.prevMonth();
        }
      },
      initDatePicker() {
        this.showDate = { ...this.splitDate(this.date, true) };
        this.copyMinDate = { ...this.splitDate(this.minDate) };
        this.copyMaxDate = { ...this.splitDate(this.maxDate) };
        this.selectDate = { ...this.showDate };
      },
      splitDate(date, addStr) {
        let result = {};
        const splitValue = date.split('-');
        try {
          if (!splitValue || splitValue.length < 3) {
            throw new Error('时间格式不正确');
          }
          result = {
            year: Number(splitValue[0]),
            month: Number(splitValue[1]),
            day: Number(splitValue[2]),
          };
          if (addStr) {
            result.week = (new Date(result.year, result.month, result.day)).getDay() + 1;
            result.monthStr = monthJson[result.month];
            result.weekStr = weekJson[result.week];
          }
        } catch (error) {
          console.error(error);
        }
        return result;
      },
      addRowEmptyValue(row, count) {
        for (let w = 0; w < count; w += 1) {
          row.push({
            value: '',
          });
        }
      },
      addRowDayValue(row, i) {
        const value = { value: i };
        const { day, month, year } = this.selectDate;
        const showDate = this.showDate;
    
        // 判断已经选择的
        if (year === showDate.year && month === showDate.month && day === i) {
          this.weekValue = (new Date(year, month, i)).getDay();
          value.selected = true;
        }
        // 当日期在最小值之外，禁止点击
        if (this.isMinLimitMonth() && i < this.copyMinDate.day) {
          value.disabled = true;
        }
        // 当日期在最大值之外，禁止点击
        if (this.isMaxLimitMonth() && i > this.copyMinDate.day) {
          value.disabled = true;
        }
        row.push(value);
      },
      /**
       * 切换到上一周
       */
      prevWeek() {   
        this.todayValue = 0;     
        this.weekSwich = 'prev';
        if (this.prevWeekClick) {
          return;
        }
        this.prevWeekClick = true;
        this.minRowArr = [];
       if(this.prevWeekClick){
          setTimeout(() => {
            this.prevWeekClick = false;
          }, 500);
          if(this.iKey + this.iIndex < 0){
            this.prevMonth();
          }else{
            this.iIndex --;
          }  
        }
        //console.log(this.iIndex,this.monthArr,this.minRowArr);        
      },
      /**
       * 切换到下一周
       */
      nextWeek() {
        this.todayValue = 0;
        if (this.nextWeekClick) {
          return;
        }
        this.nextWeekClick = true; 
        this.weekSwich = 'next';
       if(this.nextWeekClick){
          setTimeout(() => {
            this.nextWeekClick = false;
          }, 500);
          this.minRowArr = [];
          if(this.iKey + this.iIndex > this.monthArr.length){ 
            this.$nextTick(function () {
              
            })
          }else{
            this.iIndex ++;
          }   
        }
        console.log(this.iIndex,this.monthArr,this.minRowArr);
      },
      /**
       * 切换到上一个月
       */
      prevMonth() {
       //this.dayValue = '';
        if (this.prevMonthClick) {
          return;
        }
        this.prevMonthClick = true;
        setTimeout(() => {
          this.prevMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Prev';
        // 如何当前月份已经小于等于minMonth 就不让其在执行
        if (this.isMinLimitMonth()) {
          return;
        }
        const { year, month } = this.showDate;
        // 判断当前月份，如果已经等于1（1就是一月，而不是二月）
        if (month <= 1) {
          this.showDate.year = year - 1;
          this.showDate.month = 12;
        } else {
          this.showDate.month -= 1;
        }
      },
      /**
       * 切换到下一个月
       */
      nextMonth() {
        //this.dayValue = '';
        if (this.nextMonthClick) {
          return;
        }
        this.nextMonthClick = true;
        setTimeout(() => {
          this.nextMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Next';
        // 如何当前月份已经大于等于maxMonth 就不让其在执行
        if (this.isMaxLimitMonth()) {
          return;
        }
        const { year, month } = this.showDate;
        // 判断当前月份，如果已经等于12（12就是十二月）
        if (month >= 12) {
          this.showDate.year = year + 1;
          this.showDate.month = 1;
        } else {
          this.showDate.month += 1;
        }
      },
      resetSelectDate(dayValue) {
        this.selectDate = { ...this.showDate };
        this.selectDate.day = dayValue;
        this.selectDate.week = (new Date(this.showDate.year, this.showDate.month, dayValue)).getDay() + 1;
        this.selectDate.weekStr = weekJson[this.selectDate.week];
      },
      selectDay(day) {
        if (day.disabled || day.selected || day.value === '') {
          return;
        }
        this.resetSelectDate(day.value);
        this.dayValue = '';
        this.todayValue = 0;
      },
      selectToday(year, month, day) {
        const string = year.toString() + '-' + (month + 1).toString() + '-' + day.toString();
        this.date = string;
        this.initDatePicker();
        this.selectDate.year = year;
        this.selectDate.month = month;
        this.selectDate.day = day;     
        this.selectYear(year);
        this.selectDay(day);
        this.todayValue = day;
        this.selectDate.day = day;
        this.dayValue = day;
      },
      selectYear(value) {
        this.showYear = false;
        this.showDate.year = value;
        let type;
        // 当日期在最小值之外，月份换成最小值月份 或者 当日期在最大值之外，月份换成最大值月份
        if (this.isMinLimitMonth()) {
          type = 'copyMinDate';
        } else if (this.isMaxLimitMonth()) { // 当日期在最大值之外，月份换成最大值月份
          type = 'copyMaxDate';
        }
        if (type) {
          this.showDate.month = this[type].month;
          this.showDate.day = this[type].day;
          this.resetSelectDate(this.showDate.day);
          return;
        }
        let dayValue = this.selectDate.day;
        // 判断日是最大值，防止另一个月没有这个日期
        if (this.selectDate.day > 28) {
          const months = (new Date(this.showDate.year, this.showDate.month, 0)).getDate();
          // 当前月份没有这么多天，就把当前月份最大值赋值给day
          dayValue = months < dayValue ? months : dayValue;
        }
        this.resetSelectDate(dayValue);
      },
      isMinLimitMonth() {
        return this.showDate.year <= this.copyMinDate.year && this.showDate.month <= this.copyMinDate.month;
      },
      isMaxLimitMonth() {
        return this.showDate.year >= this.copyMaxDate.year && this.showDate.month >= this.copyMaxDate.month;
      },
      openYearList() {
        if (this.showYear) {
          this.showYear = false;
          return;
        }
        const index = this.yearList.indexOf(this.selectDate.year);
        this.showYear = true;
        setTimeout(() => {
          this.$refs.yearList.scrollTop = (index - 3) * 40;
        });
      },
      openCalendarList() {
        this.showYear = false;
      },
      // 保持两位数
      keepDoubleDigit(number) {
        if(number){
          return number > 9 ? number : `0${number}`;
        }else{
          return this.dayValue
        }
        
      },
      confirm() {
        const { year, month, day, week, weekStr, monthStr } = this.selectDate;
        this.$emit('confirm', {
          date: `${year}-${this.keepDoubleDigit(month)}-${this.keepDoubleDigit(day)}`,
          year,
          month,
          week,
          monthStr,
          weekStr,
          day,
        });
      },
      cancel() {
        this.$emit('cancel');
      },
    },
  };
</script>

<style lang="scss">
  @import "../../../static/styles/basic";
  @import "../../../static/styles/borderBox";
  .test{
    height: 100px;
    width: 100%;
  }
  .e-{
    &calendar-wrapper{
      background-color: #fff;
      z-index: 99999;
      
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
    &date-monthday-select{
      display: flex;
      justify-content: center;
      align-items: center;

    }
    &calendar{
      background-color: #ffffff;
      width: 100%;
    }
    &date-select{
      background-color: #333;
      padding: 12px 20px;
      color: #ffffff;
      font-weight: 500;
      font-size: 14px;
    }
    &date-year{
      font-size: 18px;
      padding-bottom: 4px;
      position: relative;
      width: 66px;
      height: 25px;
      overflow: hidden;
      &-select{
        position: absolute;
        opacity: .7;
        &.active{
          opacity: 1;
        }
      }
    }
    &date-monthday{
      font-size: 16px;
      position: relative;
      width: 100%;
      height: 36px;
      bottom: -16px;
      overflow: hidden;
      &-select{
        position: absolute;
        opacity: .7;
        &.active{
          opacity: 1;
          width: 100%;
          text-align: center;
        }
      }
    }
    &calendar-container{
    }
    &calendar-toolbar{
      margin: 5px 10px 5px 10px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title{
        position: relative;
        width: 100px;
        height: 22px;
        text-align: center;
        &-content{
          position: absolute;
          width: 100%;
          font-size: 16px;
        }
      }
    }
    &calendar-svg{
      padding: 8px;
      position: relative;
      height: 40px;
      width: 40px;
      &-icon{
        display: block;
        fill: currentColor;
        height: 24px;
        width: 24px;
        user-select: none;
        position: relative;
        z-index: 2;
      }
      &-cover{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: #E0E0E0;
        border-radius: 50%;
        opacity: 0;
        display: inline-block;
      }
    }
    &calendar-week{
      width: 100%;
      font-size: 12px;
      margin-top: 12px;
      color: rgba(0,0,0,.87);
      opacity: .5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      &-day{
        flex: 1;
        text-align: center;
      }
    }
    &calendar-monthday{
      padding-top: 10px;
      font-size: 14px;
      position: relative;
      width: 100%;
      min-height: 50px;
      overflow: hidden;
      &-long{
        min-height: 135px;
      }
      &-wrapper{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      &-row{
        display: flex;
        justify-content: center;
        align-items: center;
        &-day{
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          position: relative;  
          &.pointer{
            cursor: pointer;
          }
          &-value{
            width: 25px;
            height: 25px;
            position: relative;
            left: -4px;
            top: 8px;
            transform: translate3d(0, 0, 0);
            z-index: 15;
            border-radius: 50%;
            opacity: 1;
            display: block;
            text-align: center;

          }
          &-cover{
            width: 25px;
            height: 25px;
            background-color: #2a579a;
            position: absolute;
            left: 10px;
            top: 5px;
            transform: translate3d(0, 0, 0);
            z-index: 0;
            border-radius: 50%;
            opacity: 1;
            display: block;
          }
          &-today{
            width: 25px;
            height: 25px;
            background-color: #fff;
            border: 1px solid #2a579a;
            position: absolute;
            left: 10px;
            top: 5px;
            transform: translate3d(0, 0, 0);
            z-index: 0;
            border-radius: 50%;
            opacity: 1;
            display: block;
          }
          &.active{
            color: #ffffff;
          }
          &.disabled{
            opacity: .4;
            cursor: not-allowed;
          }
        }
      }
    }
    &calendar-year{
      height: 276px;
      overflow: auto;
      li{
        padding: 10px;
        text-align: center;
        font-size: 16px;
        &.active{
          color: #00bcd4;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    &calendar-actions{
      padding: 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .today{
    float: right;
    z-index: 999;
    cursor: pointer;
    position: relative;
  }
  .fadeX_Prev-enter-active, .fadeX_Prev-leave-active, .fadeX_Next-enter-active, .fadeX_Next-leave-active, .fadeY-enter-active, .fadeY-leave-active{
    transition: all .3s;
  }
  .fadeX_Prev-enter{
    transform: translateX(-100px);
    opacity: 0;
  }
  .fadeX_Prev-leave-active{
    transform: translateX(100px);
    opacity: 0;
  }
  .fadeX_Next-enter{
    transform: translateX(100px);
    opacity: 0;
  }
  .fadeX_Next-leave-active{
    transform: translateX(-100px);
    opacity: 0;
  }
  .fadeY-enter{
    transform: translateY(30px);
    opacity: 0;
  }
  .fadeY-leave-active{
    transform: translateY(-30px);
    opacity: 0;
  }
  .e_calendar_svg_btn-enter-active, .e_calendar_svg_btn-leave-active{
    transition: all 1s;
  }
  .e_calendar_svg_btn-enter{
    opacity: 1;
  }
  .e_calendar_day-enter-active{
      transition: all .2s;
    }
  .e_calendar_svg_btn-leave-active, .e_calendar_day-enter{
    opacity: 0;
  }
  .e_calendar_day-enter{
    width: 0;
    height: 0;
    transform: translate3d(12px, 12px, 0);
  }
  .ivu-tabs-nav{
    border-top:1px solid #e8e8e8;
  }
  .ivu-tabs-bar{
    margin-bottom: 8px;
  }
  .e-calendar-actions{
    text-align: center;
  }
  .list-card{
    overflow: auto;
    height: 340px;
  }
  .list-card li{
    position: relative;
    padding: 6px 0 6px 20px;
    border-bottom:1px solid #eee;
    color: #b0a5ab;
    font-size: 12px;
  }
  .list-card li h4{
    font-size: 16px;
    color: #333;
  }
  .list-card li p.role-1{
    color: #33a6d3;
  }
  .list-card li p.role-2{
    color: #ffb954;
  }
  .list-card li .list-time{
    position: absolute;
    top: 0px;
    right:20px;
    color:#adb4c8;
    font-size: 12px;
  }
  .list-card li .ivu-icon{
    position: absolute;
    bottom: -4px;
    right: 20px;
    color: #adb4c8;
    font-size: 24px;
  }
  .footer{
    border-top:1px solid #b8b8b8;
    border-bottom:2px solid #b8b8b8;
    padding-top: 10px;
    display: flex;
    position: fixed;
    width:100%;
    height:60px;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
  }
  .footer .ivu-col{
    text-align: center;
    justify-content: center;
    width: 20%;
  }
  .footer .ivu-col img{
    width: 20px;
  }
  .footer .ivu-col .ivu-icon{
    font-size: 22px;
    color: #bcbcbc;
  }
</style>
