import * as mockupComponents from '../mockup-components';

export default function getInPlaceProperty(type) {
  const MockupComponent = mockupComponents[type];
  const properties = Object.keys(MockupComponent.editors).filter(propertyName => {
    const editor = MockupComponent.editors[propertyName];
    if (editor === 'InPlace' || editor.type === 'InPlace') {
      return true;
    }
  });
  return properties[0];
}
