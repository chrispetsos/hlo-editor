import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Constraint {

    @JsonProperty('restricted_class', Value)
    restricted_class: Value = new Value();

    @JsonProperty('on_property', Value)
    on_property: Value = new Value();

    @JsonProperty('cardinality_type', Value)
    cardinality_type: Value = new Value();

    @JsonProperty('cardinality', Value)
    cardinality: Value = new Value();

    @JsonProperty('on_class', Value)
    on_class: Value = new Value();

    printInfo() {
        console.log('restricted_class = ' + this.restricted_class.value + ', ' +
                    'on_property = ' + this.on_property.value + ', ' +
                    'cardinality_type = ' + this.cardinality_type.value + ', ' +
                    'cardinality = ' + this.cardinality.value + ', ' +
                    'on_class = ' + this.on_class.value
          );
    }

}
