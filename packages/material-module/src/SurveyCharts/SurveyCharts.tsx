import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import Section from './Section';

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'choiceone'
  | 'choicemulti'
  | 'select'
  | 'email'
  | 'date'
  | 'titleBlock'
  | 'rating'
  | string;

export type ResponseContent = {
  responseContent: string;
  responseContentCount: number;
};

export type Statistics = {
  max: number;
  mean: number;
  min: number;
  standardDeviation: number;
  totalScore: number;
};

export type Question = {
  questionId: string;
  questionName: string;
  questionDescription?: string;
  questionNo: number;
  questionType: QuestionType;
  isRequired?: number;
  optionList?: Option[];
  questionRatingStartValue?: number;
  questionRatingEndValue?: number;
  questionRatingStartName?: string;
  questionRatingEndName?: string;
  questionCount?: number;
  responseContentList?: ResponseContent[];
  statistics?: Statistics;
};

export type Option = {
  optionId: string;
  optionName: string;
  optionCount: number;
  isOther?: number;
};

export interface SurveyChartsProps {
  data: Question[];
  totalResponses: number;
}

const SurveyCharts: FC<SurveyChartsProps> = ({ data, totalResponses }) => {
  return (
    <Grid container spacing={2}>
      {data.map(question => (
        <Grid key={question.questionId} item xs={12}>
          <Section question={question} totalResponses={totalResponses} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SurveyCharts;
