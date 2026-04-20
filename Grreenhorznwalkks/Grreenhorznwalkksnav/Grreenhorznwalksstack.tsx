import {createStackNavigator} from '@react-navigation/stack';

import Grreenhorznwalkkstab from '../../Grreenhorznwalkkstab.tsx';
import Grreenhorznwalkksloadr from '../Grreenhorznwalkkscpnt/Grreenhorznwalkksloadr.tsx';
import Grreenhorznwalkksonb from '../Grreenhorznwalkksscrns/Grreenhorznwalkksonb.tsx';
import Grreenhorznwalkkslocdtl from '../Grreenhorznwalkksscrns/Grreenhorznwalkkslocdtl.tsx';

export type GrreenhorznwalkksTabParamList = {
  Grreenhorznwalkksexplr: undefined;
  Grreenhorznwalkkssavd: undefined;
  Grreenhorznwalkksmap: {focusLocationId?: string} | undefined;
  Grreenhorznwalkkstips: undefined;
  Grreenhorznwalkksquzz: undefined;
};

export type GrreenhorznwalksRootStackParamList = {
  Grreenhorznwalkksloadr: undefined;
  Grreenhorznwalkksonb: undefined;
  Grreenhorznwalkkstab:
    | {
        screen?: keyof GrreenhorznwalkksTabParamList;
        params?: GrreenhorznwalkksTabParamList[keyof GrreenhorznwalkksTabParamList];
      }
    | undefined;
  Grreenhorznwalkkslocdtl: {locationId: string};
};

const Stack = createStackNavigator<GrreenhorznwalksRootStackParamList>();

const Grreenhorznwalksstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Grreenhorznwalkksloadr"
        component={Grreenhorznwalkksloadr}
      />
      <Stack.Screen
        name="Grreenhorznwalkksonb"
        component={Grreenhorznwalkksonb}
      />
      <Stack.Screen
        name="Grreenhorznwalkkstab"
        component={Grreenhorznwalkkstab}
      />
      <Stack.Screen
        name="Grreenhorznwalkkslocdtl"
        component={Grreenhorznwalkkslocdtl}
      />
    </Stack.Navigator>
  );
};

export default Grreenhorznwalksstack;
