import { LitElement, html, css } from 'lit';
import flatpickr from 'flatpickr';
import { property, query } from 'lit/decorators';
import { pickerStyle } from './flatpicker-style';
import { DateLimit, DateOption, Options } from 'flatpickr/dist/types/options';
import { Instance } from 'flatpickr/dist/types/instance';
/**
 *  @element uui-date-picker
 *  @description - pick a date
 */
export class UUIDatePickerElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
      input {
        display: inline-block;
        height: 30px;
        padding: 3px 6px 1px 6px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-text-field-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-text-field-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
      }
      input:hover {
        border-color: var(
          --uui-text-field-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }
      input:focus {
        border-color: var(
          --uui-text-field-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }
      :host([invalid]) {
        border-color: var(--uui-color-danger-background);
      }

      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      input[disabled] {
        background-color: var(
          --uui-text-field-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-text-field-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
      }
    `,
    pickerStyle,
  ];

  // @property()
  // locale: key | '' = '';

  @property({ type: String })
  placeholder = '';
  /**
   * Exactly the same as date format, but for the altInput field
   * @prop
   * @type string
   **/
  @property({ type: String })
  altFormat = 'F j, Y';
  /**
   * Show the user a readable date (as per altFormat), but return something totally different to the server.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  altInput = false;
  /**
   * This class will be added to the input element created by the altInput option.
   * Note that altInput already inherits classes from the original input.
   * @prop
   * @type string
   * */
  @property({ type: String })
  altInputClass = '';
  /**
   * Allows the user to enter a date directly input the input field.
   * @prop
   * @type boolean
   **/
  @property({ type: Boolean })
  allowInput = true;
  /**
   * Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud
   * @prop
   * @type string
   **/
  @property({ type: String })
  ariaDateFormat = 'F j, Y';

  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually with.open()
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  clickOpens = true;

  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * @prop
   * @type string
   * */
  @property({ type: String })
  dateFormat = 'd-m-Y H:i';

  /**
   * Sets the initial selected date(s).
   *
   * If you're using mode: "multiple" or a range calendar supply an Array of
   * Date objects or an Array of date strings which follow your dateFormat.
   *
   * Otherwise, you can supply a single Date object or a date string.
   * @prop
   * @type {DateOption|DateOption[]}
   * */
  @property({ type: Object })
  defaultDate?: DateOption | DateOption[];

  /**
   * Initial value of the hour element.
   * @prop
   * @type number
   * */
  @property({ type: Number })
  defaultHour = 12;

  /**
   * Initial value of the minute element.
   * @prop
   * @type number
   * */
  @property({ type: Number })
  defaultMinute = 0;

  /**
   * Dates selected to be unavailable for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  @property({ type: Array })
  disable: DateLimit<DateOption>[] = [];

  /**
   * Dates selected to be available for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  @property({ type: Array })
  enable: DateLimit<DateOption>[] | undefined = undefined;

  /**
   * Enables time picker
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  enableTime = true;

  /**
   * Enables seconds in the time picker
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  enableSeconds = false;

  /**
   * Adjusts the step for the hour input (incl. scrolling)
   * @prop
   * @type number
   * */
  @property({ type: Number })
  hourIncrement = 1;

  /**
   * Adjusts the step for the minute input (incl. scrolling)
   * @prop
   * @type number
   * */
  @property({ type: Number })
  minuteIncrement = 5;

  /**
   * The maximum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  @property({ type: String })
  maxDate?: DateOption;

  /**
   * The minimum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  @property({ type: String })
  minDate?: DateOption;

  /**
   * "single", "multiple", or "range"
   * @prop
   * @type {"single" | "multiple" | "range"}
   * */
  @property({ type: String })
  mode: 'single' | 'multiple' | 'range' | 'time' = 'single';

  /**
   * Hides the day selection in calendar.
   * Use it along with enableTime to create a time picker.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  noCalendar = false;

  /**
   * Where the calendar is rendered relative to the input
   * @prop
   * @type {"auto" | "above" | "below"}
   * */
  @property({ type: String })
  position: 'auto' | 'above' | 'below' = 'auto';

  /**
   * Displays the time picker in 24 hour mode without AM/PM selection when enabled
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  time_24hr = true;

  /**
   * Enabled display of week numbers in calendar
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  weekNumbers = false;

  private _pickerInstance?: Instance;

  @property({ type: Boolean })
  _hasSlottedElement = false;

  getOptions(): Options {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const options = {
      altFormat: this.altFormat,
      altInput: this.altInput,
      altInputClass: this.altInputClass,
      allowInput: this.allowInput,
      ariaDateFormat: this.ariaDateFormat,
      clickOpens: this.clickOpens,
      dateFormat: this.dateFormat,
      defaultDate: this.defaultDate,
      defaultHour: this.defaultHour,
      defaultMinute: this.defaultMinute,
      disable: this.disable,
      //disableMobile: this.disableMobile,
      enable: this.enable,
      enableTime: this.enableTime,
      enableSeconds: this.enableSeconds,
      // formatDate: this.formatDateFn,
      hourIncrement: this.hourIncrement,
      // inline: this.inline,
      maxDate: this.maxDate,
      minDate: this.minDate,
      minuteIncrement: this.minuteIncrement,
      mode: this.mode,
      // nextArrow: this.nextArrow,
      // prevArrow: this.prevArrow,
      // noCalendar: this.noCalendar,
      // onChange: this.onChange,
      // onClose: this.onClose,
      // onOpen: this.onOpen,
      // onReady: this.onReady,
      // onMonthChange: this.onMonthChange,
      // onYearChange: this.onYearChange,
      // onValueUpdate: this.onValueUpdate,
      // parseDate: this.parseDateFn,
      position: this.position,
      // shorthandCurrentMonth: this.shorthandCurrentMonth,
      // showMonths: this.showMonths,
      // static: this.static,
      // eslint-disable-next-line @typescript-eslint/camelcase
      time_24hr: this.time_24hr,
      weekNumbers: this.weekNumbers,
      //wrap: this.wrap,
    } as any;
    Object.keys(options).forEach(key => {
      if (options[key] === undefined) delete options[key];
    });
    return options;
  }

  //! DOES NOT WORK
  // private async getLocale() {
  //   if (this.locale !== '') {
  //     const localePath = `flatpickr/dist/l10n/`;
  //     const localeModule = await import('flatpickr/dist/l10n/');
  //     const stuff = localeModule.default;
  //     console.log(Russian.Russian.months);
  //   }
  // }

  initializePicker() {
    if (this._pickerInstance) {
      if (Object.prototype.hasOwnProperty.call(this, 'destroy')) {
        this._pickerInstance.destroy();
      }
    }

    if (this.pickerInput)
      this._pickerInstance = flatpickr(this.pickerInput, {
        appendTo: this.pickerParent,
        positionElement: this.pickerParent,
        onChange: this.setDate,
        ...this.getOptions(),
      });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated() {
    this.initializePicker();
  }

  private setDate(selectedDates: Date[], dateStr: string, instance: any) {
    console.log(selectedDates, dateStr, instance);
    if (this.pickerInput) this.pickerInput.value = dateStr;
  }

  @query('#picker-parent')
  pickerParent: any;

  @query('#picker-input')
  pickerInput?: HTMLInputElement;

  render() {
    return html`<div id="picker-parent">
      <input id="picker-input" type="text" paleceholder=${this.placeholder} />
    </div>`;
  }
}
