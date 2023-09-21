import React, {Component} from 'react';
import {BackHandler, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {strings} from '../../constants';
import {SearchSelectControl, SelectControl} from './SelectControls';
import {NumberRangeControl} from './NumberRangeControl';
import {DateRangeControl} from './DateRangeControl';
import {TimeRangeControl} from './TimeRangeControl';
import {styles} from '../../styles/filters';
import {getOptions} from '../../modules/filters';
import {Header} from '../../components/UI';
import {Footer} from './Footer';
import {getDateFormat} from '../../api/utils/fields';
import {BaseColumnType, getBaseColumnType} from '../../api/utils/columns';
import {form, priority} from '@prioritysoftware/priority-proto-api/lib';

@inject((stores, {screenProps}) => {
  return {...screenProps};
})
@observer
export default class FilterControl extends Component<any, any> {
  constructor(props) {
    super(props);
    this.backButtonPressed = this.backButtonPressed.bind(this);
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonPressed);
  }

  backButtonPressed() {
    const {navigation} = this.props;
    navigation && navigation.goBack();
    return true;
  }

  render() {
    const {
      updateFilter,
      searchFilter,
      openSearchFilter,
      navigation,
      route,
      filters,
      isDirty,
      oForm,
    } = this.props;
    const {field} = route.params;
    const column: priority.netitems.form.IColumn = oForm.columns[field];
    const {
      config: {detailsColumnsOptions = {}},
    } = oForm;
    const subtype = detailsColumnsOptions[field]?.subtype;

    let Control;
    let props;
    let value = filters[field] && filters[field].value;

    switch (getBaseColumnType(column.Type)) {
      case BaseColumnType.Bool:
        Control = SelectControl;
        props = {
          options: getOptions(column),
          onSelect: (...args) => updateFilter(field, ...args),
          keyToSelect: 'key',
          value,
        };
        break;
      case BaseColumnType.Date:
        Control = DateRangeControl;
        props = {
          ...column,
          options: getOptions(column),
          format: getDateFormat(column),
          onChange: (...args) => updateFilter(field, ...args),
          value,
        };
        break;
      case BaseColumnType.Time:
        Control = TimeRangeControl;
        props = {
          options: getOptions(column),
          onChange: (...args) => updateFilter(field, ...args),
          value,
        };
        break;
      default:
        switch (column.Zoom) {
          case form.ZoomType.SelectZoom:
            const searchQuery = value && value.title ? value.title : '';
            Control = SearchSelectControl;
            const textPlaceholder =
              strings.filterTextPlaceholder +
              ' ' +
              column.Title.toLowerCase() +
              ' ' +
              (strings.filterSearchPlaceholder ?? '');
            props = {
              onSelect: (...args) => updateFilter(field, ...args),
              onSearch: searchFilter,
              onOpen: (...args) => openSearchFilter(field, ...args),
              onChangeText: (...args) => updateFilter(field, ...args),
              keyToSelect: 'retval',
              searchQuery,
              textPlaceholder,
              value,
              subtype,
            };
            break;
          default:
            switch (getBaseColumnType(column.Type)) {
              case BaseColumnType.Number:
                Control = NumberRangeControl;
                props = {
                  ...column,
                  onChange: (...args) => updateFilter(field, ...args),
                  value,
                };
                break;
              default:
                Control = () => <View />;
                props = {};
            }
        }
    }
    return (
      <View style={styles.container}>
        <View style={styles.container} testID={'advanced-search-parameters-container'}>
          <Header
            underlined
            title={column.Title}
            navigation={navigation}
            backTitle={strings.advancedSearch}
            isRTL={strings.isRTL}
          />
          <Control {...props} />
        </View>
        <Footer
          oForm={oForm}
          isControl
          isFiltersDirty={isDirty}
          hasFilters={filters && Object.keys(filters).length > 0}
          onBackPress={this.backButtonPressed}
          applyFilters={this.props.applyFilters}
        />
      </View>
    );
  }
}
