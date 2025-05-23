import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormRadio,
  ProFormCheckbox
} from "@ant-design/pro-components"
import {DeleteOutlined} from "@ant-design/icons";
import {usePage} from "../contexts/PageContext";

export default function FormBar() {
  const {
    formConfig,
    formItemConfig,
    selectIndex,
    deleteFormItem,
    setSelectIndex
  } = usePage()

  const formItemList = formItemConfig.map((formItem, index) => {
    const {tag, label, name, placeholder, defaultValue, options = []} = formItem
    let formItemComponent = null;
    switch (tag) {
      case 'input':
        formItemComponent = <ProFormText
          key={index}
          label={label}
          name={name}
          placeholder={placeholder}
          initialValue={defaultValue}
        />
        break;
      case 'textarea':
        formItemComponent = <ProFormTextArea
          key={index}
          label={label}
          name={name}
          placeholder={placeholder}
          initialValue={defaultValue}
        />
        break;
      case 'select':
        formItemComponent = <ProFormSelect
          key={index}
          label={label}
          name={name}
          placeholder={placeholder}
          initialValue={defaultValue}
          options={options}
        />
        break;
      case 'radio-group':
        formItemComponent = <ProFormRadio.Group
          key={index}
          label={label}
          name={name}
          initialValue={defaultValue}
          options={options}
        />
        break;
      case 'checkbox-group':
        formItemComponent = <ProFormCheckbox.Group
          key={index}
          label={label}
          name={name}
          initialValue={defaultValue}
          options={options}
        />
        break;
      default:
        formItemComponent = <span key={index}>未知tag={formItem.tag}</span>
        break;
    }
    return <div
      className={['form-item-wrapper', selectIndex === index ? 'selected' : null].filter(item => item).join(' ')}
      key={index}>
      <div className='hotspot' onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        setSelectIndex(
          selectIndex !== index || selectIndex === null
            ? index
            : null
        );
      }}/>
      {formItemComponent}
      <div className={'form-item-control-wrapper'}>
        <DeleteOutlined onClick={(event) => {
          event.stopPropagation()
          deleteFormItem(index)
        }}/>
      </div>
    </div>
  })

  return (
    <div className='form-bar'>
      <ProForm
        layout={formConfig.layout}
        labelAlign={formConfig.labelAlign}
        submitter={false}
        autoFocusFirstInput={false}
        labelCol={{style: {width: '120px'}}}
      >
        {formItemList}
      </ProForm>
    </div>
  )
}