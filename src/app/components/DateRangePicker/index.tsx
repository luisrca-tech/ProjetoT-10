import * as React from "react";
import { Container } from "./styles";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";

interface State {
  startDate: Date | null;
  endDate: Date | null;
  focusedInput: "startDate" | "endDate" | null;
}

type Action =
  | { type: "focusChange"; payload: "startDate" | "endDate" | null }
  | { type: "dateChange"; payload: State };

const initialState: State = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

export default function DateRangePickerInput() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Container>
      <DateRangeInput
        onDatesChange={(data: State) =>
          dispatch({ type: "dateChange", payload: data })
        }
        onFocusChange={(focusedInput: "startDate" | "endDate" | null) =>
          dispatch({ type: "focusChange", payload: focusedInput })
        }
        startDate={state.startDate} // Date or null
        endDate={state.endDate} // Date or null
        focusedInput={state.focusedInput} // 'startDate', 'endDate' or null
      />
    </Container>
  );
}
