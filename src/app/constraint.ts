import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Constraint {

    @JsonProperty('restricted_class', Value)
    restricted_class: Value = undefined;

    @JsonProperty('on_property', Value)
    on_property: Value = undefined;

    @JsonProperty('cardinality_type', Value)
    cardinality_type: Value = undefined;

    @JsonProperty('cardinality', Value)
    cardinality: Value = undefined;

    @JsonProperty('on_class', Value)
    on_class: Value = undefined;

    printInfo() {
        console.log('restricted_class = ' + this.restricted_class.value + ', ' +
                    'on_property = ' + this.on_property.value + ', ' +
                    'cardinality_type = ' + this.cardinality_type.value + ', ' +
                    'cardinality = ' + this.cardinality.value + ', ' +
                    'on_class = ' + this.on_class.value
          );
    }

}
