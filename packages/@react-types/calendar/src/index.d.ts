/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, DOMProps, RangeValue, StyleProps, ValidationState, ValueBase} from '@react-types/shared';
import {CalendarDate, CalendarDateTime, ZonedDateTime} from '@internationalized/date';
import {ReactNode} from 'react';

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;
type MappedDateValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends CalendarDate ? CalendarDate :
  never;

export interface CalendarPropsBase {
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue,
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue,
  /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. */
  isDateUnavailable?: (date: DateValue) => boolean,
  /**
   * Whether the calendar is disabled.
   * @default false
   */
  isDisabled?: boolean,
  /**
   * Whether the calendar value is immutable.
   * @default false
   */
  isReadOnly?: boolean,
  /**
   * Whether to automatically focus the calendar when it mounts.
   * @default false
   */
  autoFocus?: boolean,
  /** Controls the currently focused date within the calendar. */
  focusedValue?: DateValue,
  /** The date that is focused when the calendar first mounts (uncountrolled). */
  defaultFocusedValue?: DateValue,
  /** Handler that is called when the focused date changes. */
  onFocusChange?: (date: CalendarDate) => void,
  /** Whether the current selection is valid or invalid according to application logic. */
  validationState?: ValidationState,
  /** An error message to display when the selected value is invalid. */
  errorMessage?: ReactNode
}

export type DateRange = RangeValue<DateValue>;
export interface CalendarProps<T extends DateValue> extends CalendarPropsBase, ValueBase<T, MappedDateValue<T>>, DOMProps, AriaLabelingProps {}
export interface RangeCalendarProps<T extends DateValue> extends CalendarPropsBase, ValueBase<RangeValue<T>, RangeValue<MappedDateValue<T>>>, DOMProps, AriaLabelingProps {
  /**
   * When combined with `isDateUnavailable`, determines whether non-contiguous ranges,
   * i.e. ranges containing unavailable dates, may be selected.
   */
  allowsNonContiguousRanges?: boolean
}

export interface SpectrumCalendarProps<T extends DateValue> extends CalendarProps<T>, StyleProps {
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default 1
   */
  visibleMonths?: number
}

export interface SpectrumRangeCalendarProps<T extends DateValue> extends RangeCalendarProps<T>, StyleProps {
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default 1
   */
  visibleMonths?: number
}
