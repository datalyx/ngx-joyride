import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
export const DEFAULT_THEME_COLOR = '#3b5560';
export const STEP_DEFAULT_POSITION = 'bottom';
export const DEFAULT_TIMEOUT_BETWEEN_STEPS = 1;
export class ObservableCustomTexts {
}
export const DEFAULT_TEXTS = {
    prev: of('prev'),
    next: of('next'),
    done: of('done'),
    close: of(null)
};
export class JoyrideOptionsService {
    constructor() {
        this.themeColor = DEFAULT_THEME_COLOR;
        this.stepDefaultPosition = STEP_DEFAULT_POSITION;
        this.logsEnabled = false;
        this.showCounter = true;
        this.showPrevButton = true;
        this.stepsOrder = [];
    }
    setOptions(options) {
        this.stepsOrder = options.steps;
        this.stepDefaultPosition = options.stepDefaultPosition
            ? options.stepDefaultPosition
            : this.stepDefaultPosition;
        this.logsEnabled =
            typeof options.logsEnabled !== 'undefined'
                ? options.logsEnabled
                : this.logsEnabled;
        this.showCounter =
            typeof options.showCounter !== 'undefined'
                ? options.showCounter
                : this.showCounter;
        this.showPrevButton =
            typeof options.showPrevButton !== 'undefined'
                ? options.showPrevButton
                : this.showPrevButton;
        this.themeColor = options.themeColor
            ? options.themeColor
            : this.themeColor;
        this.firstStep = options.startWith;
        this.waitingTime =
            typeof options.waitingTime !== 'undefined'
                ? options.waitingTime
                : DEFAULT_TIMEOUT_BETWEEN_STEPS;
        typeof options.customTexts !== 'undefined'
            ? this.setCustomText(options.customTexts)
            : this.setCustomText(DEFAULT_TEXTS);
    }
    getBackdropColor() {
        return this.hexToRgb(this.themeColor);
    }
    getThemeColor() {
        return this.themeColor;
    }
    getStepDefaultPosition() {
        return this.stepDefaultPosition;
    }
    getStepsOrder() {
        return this.stepsOrder;
    }
    getFirstStep() {
        return this.firstStep;
    }
    getWaitingTime() {
        return this.waitingTime;
    }
    areLogsEnabled() {
        return this.logsEnabled;
    }
    isCounterVisible() {
        return this.showCounter;
    }
    isPrevButtonVisible() {
        return this.showPrevButton;
    }
    getCustomTexts() {
        return this.customTexts;
    }
    setCustomText(texts) {
        let prev;
        let next;
        let done;
        let close;
        prev = texts.prev ? texts.prev : DEFAULT_TEXTS.prev;
        next = texts.next ? texts.next : DEFAULT_TEXTS.next;
        done = texts.done ? texts.done : DEFAULT_TEXTS.done;
        close = texts.close ? texts.close : DEFAULT_TEXTS.close;
        this.customTexts = {
            prev: this.toObservable(prev),
            next: this.toObservable(next),
            done: this.toObservable(done),
            close: this.toObservable(close)
        };
    }
    toObservable(value) {
        return value instanceof Observable ? value : of(value);
    }
    hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : null;
    }
}
JoyrideOptionsService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95cmlkZS1vcHRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtam95cmlkZS9zcmMvbGliL3NlcnZpY2VzL2pveXJpZGUtb3B0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdEMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQztBQUM5QyxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUM7QUFFL0MsTUFBTSxPQUFPLHFCQUFxQjtDQUtqQztBQUNELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBMEI7SUFDaEQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDaEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDaEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDaEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7Q0FDbEIsQ0FBQztBQWlCRixNQUFNLE9BQU8scUJBQXFCO0lBRGxDO1FBRVksZUFBVSxHQUFXLG1CQUFtQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFXLHFCQUFxQixDQUFDO1FBQ3BELGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBYSxFQUFFLENBQUM7SUE4R3RDLENBQUM7SUF6R0csVUFBVSxDQUFDLE9BQXVCO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJ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QUFDLEVBQ1QsRUFBRSxDQUNMLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2YsQ0FBQzs7O1lBcEhKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBKb3lyaWRlT3B0aW9ucyxcclxuICAgIEN1c3RvbVRleHRzLFxyXG4gICAgSUN1c3RvbVRleHRzXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2pveXJpZGUtb3B0aW9ucy5jbGFzcyc7XHJcbmltcG9ydCB7IG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9USEVNRV9DT0xPUiA9ICcjM2I1NTYwJztcclxuZXhwb3J0IGNvbnN0IFNURVBfREVGQVVMVF9QT1NJVElPTiA9ICdib3R0b20nO1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FT1VUX0JFVFdFRU5fU1RFUFMgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVDdXN0b21UZXh0cyBpbXBsZW1lbnRzIElDdXN0b21UZXh0cyB7XHJcbiAgICBwcmV2OiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICBuZXh0OiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICBkb25lOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICBjbG9zZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG59XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RFWFRTOiBPYnNlcnZhYmxlQ3VzdG9tVGV4dHMgPSB7XHJcbiAgICBwcmV2OiBvZigncHJldicpLFxyXG4gICAgbmV4dDogb2YoJ25leHQnKSxcclxuICAgIGRvbmU6IG9mKCdkb25lJyksXHJcbiAgICBjbG9zZTogb2YobnVsbClcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUpveXJpZGVPcHRpb25zU2VydmljZSB7XHJcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IEpveXJpZGVPcHRpb25zKTogdm9pZDtcclxuICAgIGdldEJhY2tkcm9wQ29sb3IoKTogc3RyaW5nO1xyXG4gICAgZ2V0VGhlbWVDb2xvcigpOiBzdHJpbmc7XHJcbiAgICBnZXRTdGVwRGVmYXVsdFBvc2l0aW9uKCk7XHJcbiAgICBnZXRTdGVwc09yZGVyKCk6IHN0cmluZ1tdO1xyXG4gICAgZ2V0Rmlyc3RTdGVwKCk6IHN0cmluZztcclxuICAgIGdldFdhaXRpbmdUaW1lKCk6IG51bWJlcjtcclxuICAgIGFyZUxvZ3NFbmFibGVkKCk6IGJvb2xlYW47XHJcbiAgICBpc0NvdW50ZXJWaXNpYmxlKCk6IGJvb2xlYW47XHJcbiAgICBpc1ByZXZCdXR0b25WaXNpYmxlKCk6IGJvb2xlYW47XHJcbiAgICBnZXRDdXN0b21UZXh0cygpOiBPYnNlcnZhYmxlQ3VzdG9tVGV4dHM7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEpveXJpZGVPcHRpb25zU2VydmljZSBpbXBsZW1lbnRzIElKb3lyaWRlT3B0aW9uc1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSB0aGVtZUNvbG9yOiBzdHJpbmcgPSBERUZBVUxUX1RIRU1FX0NPTE9SO1xyXG4gICAgcHJpdmF0ZSBzdGVwRGVmYXVsdFBvc2l0aW9uOiBzdHJpbmcgPSBTVEVQX0RFRkFVTFRfUE9TSVRJT047XHJcbiAgICBwcml2YXRlIGxvZ3NFbmFibGVkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNob3dDb3VudGVyID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgc2hvd1ByZXZCdXR0b24gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBzdGVwc09yZGVyOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBmaXJzdFN0ZXA6IHN0cmluZztcclxuICAgIHByaXZhdGUgd2FpdGluZ1RpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VzdG9tVGV4dHM6IE9ic2VydmFibGVDdXN0b21UZXh0cztcclxuXHJcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IEpveXJpZGVPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwc09yZGVyID0gb3B0aW9ucy5zdGVwcztcclxuICAgICAgICB0aGlzLnN0ZXBEZWZhdWx0UG9zaXRpb24gPSBvcHRpb25zLnN0ZXBEZWZhdWx0UG9zaXRpb25cclxuICAgICAgICAgICAgPyBvcHRpb25zLnN0ZXBEZWZhdWx0UG9zaXRpb25cclxuICAgICAgICAgICAgOiB0aGlzLnN0ZXBEZWZhdWx0UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5sb2dzRW5hYmxlZCA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ3NFbmFibGVkICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLmxvZ3NFbmFibGVkXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMubG9nc0VuYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5zaG93Q291bnRlciA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLnNob3dDb3VudGVyICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLnNob3dDb3VudGVyXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2hvd0NvdW50ZXI7XHJcbiAgICAgICAgdGhpcy5zaG93UHJldkJ1dHRvbiA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLnNob3dQcmV2QnV0dG9uICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLnNob3dQcmV2QnV0dG9uXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2hvd1ByZXZCdXR0b247XHJcbiAgICAgICAgdGhpcy50aGVtZUNvbG9yID0gb3B0aW9ucy50aGVtZUNvbG9yXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy50aGVtZUNvbG9yXHJcbiAgICAgICAgICAgIDogdGhpcy50aGVtZUNvbG9yO1xyXG4gICAgICAgIHRoaXMuZmlyc3RTdGVwID0gb3B0aW9ucy5zdGFydFdpdGg7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nVGltZSA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLndhaXRpbmdUaW1lICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLndhaXRpbmdUaW1lXHJcbiAgICAgICAgICAgICAgICA6IERFRkFVTFRfVElNRU9VVF9CRVRXRUVOX1NURVBTO1xyXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmN1c3RvbVRleHRzICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICA/IHRoaXMuc2V0Q3VzdG9tVGV4dChvcHRpb25zLmN1c3RvbVRleHRzKVxyXG4gICAgICAgICAgICA6IHRoaXMuc2V0Q3VzdG9tVGV4dChERUZBVUxUX1RFWFRTKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCYWNrZHJvcENvbG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhleFRvUmdiKHRoaXMudGhlbWVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGhlbWVDb2xvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVtZUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBEZWZhdWx0UG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcERlZmF1bHRQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdGVwc09yZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzT3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rmlyc3RTdGVwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpcnN0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXYWl0aW5nVGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWl0aW5nVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBhcmVMb2dzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dzRW5hYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvdW50ZXJWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dDb3VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUHJldkJ1dHRvblZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1ByZXZCdXR0b247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VzdG9tVGV4dHMoKTogT2JzZXJ2YWJsZUN1c3RvbVRleHRzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21UZXh0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEN1c3RvbVRleHQodGV4dHM6IEN1c3RvbVRleHRzKSB7XHJcbiAgICAgICAgbGV0IHByZXY6IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICAgICAgICBsZXQgbmV4dDogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBkb25lO1xyXG4gICAgICAgIGxldCBjbG9zZTtcclxuICAgICAgICBwcmV2ID0gdGV4dHMucHJldiA/IHRleHRzLnByZXYgOiBERUZBVUxUX1RFWFRTLnByZXY7XHJcbiAgICAgICAgbmV4dCA9IHRleHRzLm5leHQgPyB0ZXh0cy5uZXh0IDogREVGQVVMVF9URVhUUy5uZXh0O1xyXG4gICAgICAgIGRvbmUgPSB0ZXh0cy5kb25lID8gdGV4dHMuZG9uZSA6IERFRkFVTFRfVEVYVFMuZG9uZTtcclxuICAgICAgICBjbG9zZSA9IHRleHRzLmNsb3NlID8gdGV4dHMuY2xvc2UgOiBERUZBVUxUX1RFWFRTLmNsb3NlO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tVGV4dHMgPSB7XHJcbiAgICAgICAgICAgIHByZXY6IHRoaXMudG9PYnNlcnZhYmxlKHByZXYpLFxyXG4gICAgICAgICAgICBuZXh0OiB0aGlzLnRvT2JzZXJ2YWJsZShuZXh0KSxcclxuICAgICAgICAgICAgZG9uZTogdGhpcy50b09ic2VydmFibGUoZG9uZSksXHJcbiAgICAgICAgICAgIGNsb3NlOiB0aGlzLnRvT2JzZXJ2YWJsZShjbG9zZSlcclxuICAgICAgICB9IGFzIE9ic2VydmFibGVDdXN0b21UZXh0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvT2JzZXJ2YWJsZSh2YWx1ZTogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IHZhbHVlIDogb2YodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGV4VG9SZ2IoaGV4OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcclxuICAgICAgICBoZXggPSBoZXgucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgKG06IGFueSwgcjogYW55LCBnOiBhbnksIGI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgICAgID8gYCR7cGFyc2VJbnQocmVzdWx0WzFdLCAxNil9LCAke3BhcnNlSW50KFxyXG4gICAgICAgICAgICAgICAgICByZXN1bHRbMl0sXHJcbiAgICAgICAgICAgICAgICAgIDE2XHJcbiAgICAgICAgICAgICAgKX0sICR7cGFyc2VJbnQocmVzdWx0WzNdLCAxNil9YFxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19