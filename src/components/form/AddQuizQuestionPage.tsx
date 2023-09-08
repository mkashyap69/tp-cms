'use client';
import { Select, Form, Button, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import AddEditTextQuestionForm from './AddEditTextQuestionForm';
import AddImageQuestionForm from './AddImageQuestionForm';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

function AddQuizQuestionPage(props: unknown) {
  //@ts-ignore

  const { selectedQuestion, mode, addNewQuestion, updateQuestion, week } =
    props;
  const [questionType, setQuestionType] = useState(selectedQuestion?.type);
  const [imageOptionsArray, setImageOptionsArray] = useState(
    selectedQuestion?.option
  );
  const [status, setStatus] = useState(
    selectedQuestion && selectedQuestion?.live ? selectedQuestion?.live : false
  );

  const handleQuestionTypeChange = (questionType: any) => {
    setQuestionType(questionType);
  };

  const setImageUrls = (imageUrl: any, index: number) => {
    const tempArray = [...imageOptionsArray];
    tempArray[index - 1] = imageUrl;
    setImageOptionsArray(tempArray);
  };

  const handleStatusChange = (checked: any) => {
    setStatus(checked);
  };

  useEffect(() => {
    if (selectedQuestion) {
      setQuestionType(selectedQuestion?.type);
      setStatus(selectedQuestion?.live);
    }
  }, [props]);

  const minOption = 2;
  const onFinish = (values: {
    option1: any;
    option2: any;
    option3: any;
    option4: any;
    question: any;
    type: any;
    answerIndex: any;
    status: any;
  }) => {
    const OptionArray = [];
    let DataToSend = {};
    if (questionType === 'text') {
      OptionArray.push(values?.option1);
      OptionArray.push(values?.option2);
      if (values.option3) {
        OptionArray.push(values?.option3);
      }
      if (values.option4) {
        OptionArray.push(values?.option4);
      }
      DataToSend = {
        question: values?.question,
        type: values?.type,
        option: OptionArray,
        answerIndex: values?.answerIndex,
        week: Number(week),
        live: values?.status,
      };
    } else if (questionType === 'image') {
      if (imageOptionsArray?.length < minOption) {
        // eslint-disable-next-line no-alert
        alert('Please select required options');
        return;
      }
      DataToSend = {
        question: values?.question,
        type: values?.type,
        answerIndex: values?.answerIndex,
        week: Number(week),
        option: imageOptionsArray,
        live: values?.status,
      };
    }

    if (mode === 'Create') {
      addNewQuestion({
        variables: {
          week: Number(week),
          question: DataToSend,
        },
      });
    } else if (mode === 'Edit') {
      updateQuestion({
        variables: {
          id: selectedQuestion?._id,
          question: DataToSend,
        },
      });
    }
    //@ts-ignore

    props?.closeForm();
  };

  return (
    <>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          type: questionType,
          status,
          question:
            selectedQuestion && selectedQuestion?.question
              ? selectedQuestion?.question
              : null,
          option1:
            selectedQuestion &&
            selectedQuestion?.option &&
            selectedQuestion?.option[0]
              ? selectedQuestion?.option[0]
              : null,
          option2:
            selectedQuestion &&
            selectedQuestion?.option &&
            selectedQuestion?.option[1]
              ? selectedQuestion?.option[1]
              : null,
          option3:
            selectedQuestion &&
            selectedQuestion?.option &&
            selectedQuestion?.option[2]
              ? selectedQuestion?.option[2]
              : null,
          option4:
            selectedQuestion &&
            selectedQuestion?.option &&
            selectedQuestion?.option[3]
              ? selectedQuestion?.option[3]
              : null,
          answerIndex:
            selectedQuestion && selectedQuestion?.answerIndex === 0
              ? 0
              : selectedQuestion?.answerIndex,
        }}
      >
        <Form.Item
          name={['type']}
          label="Question Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Question Type"
            allowClear
            onChange={handleQuestionTypeChange}
            defaultValue={questionType}
          >
            <Option value="text" key="text">
              Text Ques_Text Options
            </Option>
            <Option value="image" key="image">
              Text Ques_Image Options
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name={['status']}>
          <Switch
            checked={status}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleStatusChange}
          />
        </Form.Item>
        {questionType === 'text' ? (
          <AddEditTextQuestionForm selectedQuestion={selectedQuestion} />
        ) : (
          ''
        )}
        {questionType === 'image' ? (
          <AddImageQuestionForm
            selectedQuestion={selectedQuestion}
            setImageUrls={setImageUrls}
          />
        ) : (
          ''
        )}

        {questionType ? (
          <Form.Item>
            <Button style={{ marginTop: '25px' }} block htmlType="submit">
              {mode === 'Create' ? 'Add Question' : 'Update question'}
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    </>
  );
}

export default AddQuizQuestionPage;
