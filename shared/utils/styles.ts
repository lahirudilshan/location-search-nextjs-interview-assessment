import styled from 'styled-components';
import { Property } from 'csstype';

enum CSSUnits { 'px', 'vh', 'rem', 'cm', 'mm', 'in', 'pt', 'pc' };

// flex utils
const Flex = styled.div<{
    justifyContent?: Property.JustifyContent;
    alignItems?: Property.AlignItems;
    direction?: Property.FlexDirection;
    width?: string;
    height?: string;
    minHeight?: string;
    margin?: string;
    gap?: string
    wrap?: Property.FlexWrap
}>`
    display: flex;
    ${props => props.direction && `flex-direction: ${props.direction};`}
    ${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
    ${props => props.alignItems && `align-items: ${props.alignItems};`}
    ${props => props.minHeight && `min-height: ${props.minHeight};`}
    ${props => props.height && `height: ${props.height};`}
    ${props => props.width && `width: ${props.width};`}
    ${props => props.margin && `margin: ${props.margin};`}
    ${props => props.gap && `gap: ${props.gap};`}
    ${props => props.wrap && `flex-wrap: ${props.wrap};`}
`;

// spaces utils
const Space = styled.div<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
    size?: number;
    unit?: keyof typeof CSSUnits;
}>`
    ${props => props.top && `margin-top: ${props.top || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.bottom && `margin-bottom: ${props.bottom || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.left && `margin-left: ${props.left || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.right && `margin-right: ${props.right || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.x && `margin: 0 ${props.x}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.y && `margin: ${props.y}${(props.unit && props.unit) || 'rem'} 0`};
    ${props => props.size && `margin: ${props.size}${(props.unit && props.unit) || 'rem'}`};
`;

// text utils
const TextBold = styled.div<{ weight?: Property.FontWeight | number }>`
    ${props => `font-weight: ${props.weight || 400}`};
`;

const TextTruncate = styled.div<{ size: number }>`
    ${props => `width: ${props.size || 250}rem`};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// others
const PageContent = styled.div < { top?: number; bottom?: number; left?: number; right?: number; unit?: keyof typeof CSSUnits; }>`
    ${props => `margin-top: ${props.top || 4}${props.unit || 'rem'}`};
    ${props => `margin-bottom: ${props.bottom || 4}${props.unit || 'rem'}`};
    ${props => `margin-left: ${props.left || 4}${props.unit || 'rem'}`};
    ${props => `margin-right: ${props.right || 4}${props.unit || 'rem'}`};

    .ant-tabs-nav {
        margin-bottom: 0;
    }
`;

const MinHeight = styled.div<{ size?: number; unit?: keyof typeof CSSUnits }>`
    ${props => `min-height: ${props.size || 20}${props.unit || 'rem'}`};
`;

const ScrollView = styled.div<{ height?: string; }>`
  height: ${props => props.height || '20rem'};
`;

const Position = styled.div<{ type?: Property.Position }>`
 position: ${(props) => `${props.type || 'relative'}`};
`;

export {
    Flex,
    Space,
    PageContent,
    TextTruncate,
    TextBold,
    MinHeight,
    ScrollView,
    Position
};
