import { ColorModeColor, ColorsWithScheme } from '../types/kiosk.types';
import { useEffect, useState } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { BlockPicker } from 'react-color';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleForm } from '../types/types';
import { l } from '../utils/language';

interface ColorPickerFieldProps {
  name: keyof ColorsWithScheme;
}

export function ColorPickerField({ name }: ColorPickerFieldProps) {
  const { control } = useFormContext<StyleForm>();
  return (
    <Controller
      render={({ field: { value, onChange } }) => <ColorPicker value={value} onChange={onChange} />}
      name={name}
      control={control}
    />
  );
}

interface ColorPickerProps {
  value: ColorModeColor;
  onChange: (value: ColorModeColor) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [lightColor, setLightColor] = useState(value.light);
  const [darkColor, setDarkColor] = useState(value.dark);
  useEffect(() => {
    onChange({ dark: darkColor, light: lightColor });
  }, [darkColor, lightColor, onChange]);
  useEffect(() => {
    setDarkColor(value.dark);
    setLightColor(value.light);
  }, [value]);
  return (
    <HStack>
      <VStack>
        <Text>{l('theme.light')}</Text>
        <BlockPicker
          triangle='hide'
          color={lightColor}
          onChange={(color) => {
            setLightColor(color.hex);
          }}
        />
      </VStack>
      <VStack>
        <Text>{l('theme.dark')}</Text>
        <BlockPicker
          triangle='hide'
          color={darkColor}
          onChange={(color) => {
            setDarkColor(color.hex);
          }}
        />
      </VStack>
    </HStack>
  );
}
